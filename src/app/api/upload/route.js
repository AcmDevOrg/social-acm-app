import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function bufferToStream(buffer) {
  const readable = new Readable();
  readable._read = () => {}; // _read is required but you can noop it
  readable.push(buffer);
  readable.push(null);
  return readable;
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return new Response(JSON.stringify({ error: 'No file provided' }), { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'uploads' }, // Optional folder in your Cloudinary account
      (error, result) => {
        if (error) throw error;
        return result;
      }
    );

    const stream = await bufferToStream(buffer);
    const uploadResult = await new Promise((resolve, reject) => {
      stream.pipe(
        cloudinary.uploader.upload_stream(
          { folder: 'uploads' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
      );
    });

    return new Response(JSON.stringify({ url: uploadResult.secure_url }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }, 
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
