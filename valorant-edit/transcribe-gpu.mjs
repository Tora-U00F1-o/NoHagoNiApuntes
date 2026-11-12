import {readFileSync, writeFileSync} from 'node:fs';
import {downloadWhisperModel, loadWhisperModel, transcribe, toCaptions} from '@remotion/whisper-webgpu';
const b = readFileSync('analysis/audio.wav');
let offset = 12;
let data;
while (offset + 8 <= b.length) {
  const name = b.toString('ascii', offset, offset + 4);
  const size = b.readUInt32LE(offset + 4);
  if (name === 'data') { data = b.subarray(offset + 8, offset + 8 + size); break; }
  offset += 8 + size + (size % 2);
}
const waveform = new Float32Array(data.length / 2);
for (let i = 0; i < waveform.length; i++) waveform[i] = data.readInt16LE(i * 2) / 32768;
const model = 'small';
console.log('Downloading Whisper WebGPU');
await downloadWhisperModel({model});
const handle = await loadWhisperModel({model});
console.log('Transcribing');
const result = await transcribe({channelWaveform: waveform, model, language: 'spanish'});
writeFileSync('analysis/webgpu-captions.json', JSON.stringify(toCaptions({whisperWebGpuOutput: result}), null, 2));
await handle[Symbol.asyncDispose]();
console.log('Done');

