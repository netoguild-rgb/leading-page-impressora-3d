const fs = require('fs');
const path = require('path');

function readAtomSize(buf, offset, end) {
  if (offset + 8 > end) return null;
  let size = buf.readUInt32BE(offset);
  const type = buf.toString('ascii', offset + 4, offset + 8);
  let header = 8;

  if (size === 1) {
    if (offset + 16 > end) return null;
    const big = buf.readBigUInt64BE(offset + 8);
    size = Number(big);
    header = 16;
  } else if (size === 0) {
    size = end - offset;
  }

  if (size < header || offset + size > end) return null;
  return { size, type, header, start: offset, end: offset + size };
}

function childAtoms(buf, start, end) {
  const out = [];
  let off = start;
  while (off + 8 <= end) {
    const atom = readAtomSize(buf, off, end);
    if (!atom) break;
    out.push(atom);
    off += atom.size;
  }
  return out;
}

function firstChild(buf, parent, type) {
  return childAtoms(buf, parent.start + parent.header, parent.end).find((a) => a.type === type) || null;
}

function allChildren(buf, parent, type) {
  return childAtoms(buf, parent.start + parent.header, parent.end).filter((a) => a.type === type);
}

function getVideoTrackInfo(filePath) {
  const buf = fs.readFileSync(filePath);
  const topAtoms = childAtoms(buf, 0, buf.length);
  const moov = topAtoms.find((a) => a.type === 'moov');
  if (!moov) throw new Error('moov atom not found');

  const traks = allChildren(buf, moov, 'trak');
  for (const trak of traks) {
    const mdia = firstChild(buf, trak, 'mdia');
    if (!mdia) continue;
    const hdlr = firstChild(buf, mdia, 'hdlr');
    if (!hdlr) continue;

    const handlerOffset = hdlr.start + hdlr.header + 8;
    if (handlerOffset + 4 > hdlr.end) continue;
    const handlerType = buf.toString('ascii', handlerOffset, handlerOffset + 4);
    if (handlerType !== 'vide') continue;

    const minf = firstChild(buf, mdia, 'minf');
    const stbl = minf ? firstChild(buf, minf, 'stbl') : null;
    if (!stbl) continue;

    const stsz = firstChild(buf, stbl, 'stsz');
    const stz2 = firstChild(buf, stbl, 'stz2');
    const stss = firstChild(buf, stbl, 'stss');

    let sampleCount = null;
    if (stsz) {
      const sampleCountOffset = stsz.start + stsz.header + 8;
      if (sampleCountOffset + 4 <= stsz.end) {
        sampleCount = buf.readUInt32BE(sampleCountOffset);
      }
    } else if (stz2) {
      const sampleCountOffset = stz2.start + stz2.header + 8;
      if (sampleCountOffset + 4 <= stz2.end) {
        sampleCount = buf.readUInt32BE(sampleCountOffset);
      }
    }

    let keyframeCount = null;
    if (stss) {
      const entryCountOffset = stss.start + stss.header + 4;
      if (entryCountOffset + 4 <= stss.end) {
        keyframeCount = buf.readUInt32BE(entryCountOffset);
      }
    }

    const allKeyframes = keyframeCount == null
      ? (sampleCount != null ? true : null)
      : (sampleCount != null ? keyframeCount === sampleCount : null);

    return {
      file: path.basename(filePath),
      sampleCount,
      keyframeCount: keyframeCount == null ? 'stss ausente (provavelmente all-I)' : keyframeCount,
      allKeyframes,
    };
  }

  throw new Error('video track not found');
}

const files = process.argv.slice(2);
if (!files.length) {
  console.error('Use: node tools/mp4-keyframes.js <file1> <file2> ...');
  process.exit(1);
}

for (const f of files) {
  const info = getVideoTrackInfo(f);
  console.log(JSON.stringify(info));
}
