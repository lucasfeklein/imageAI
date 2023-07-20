import S3 from "aws-sdk/clients/s3";
import axios from "axios";
import { randomUUID } from "crypto";
import { env } from "~/env.mjs";

const s3 = new S3({
  signatureVersion: "v4",
  s3BucketEndpoint: true,
  endpoint:
    "https://97d1ed7a181daf7c8fe205b450931a3e.r2.cloudflarestorage.com/urpm-images",
  accessKeyId: env.R2_ACCESS_KEY_ID,
  secretAccessKey: env.R2_SECRET_ACCESS_KEY,
});

async function downloadAndUploadImage(imageURL: string) {
  try {
    // Download the image using axios
    const response = await axios.get(imageURL, { responseType: "arraybuffer" });
    const imageBuffer = Buffer.from(response.data, "binary");

    const randomKey = `${randomUUID()}.png`;

    // Upload the image to S3 bucket
    const params = {
      Bucket: "urpm-klein",
      Key: randomKey,
      Body: imageBuffer,
      ContentType: "image/png",
    };
    await s3.upload(params).promise();

    console.log("Image uploaded successfully");

    return randomKey;
  } catch (error) {
    console.error("Error occurred during download and upload:", error);
  }
}

export default downloadAndUploadImage;
