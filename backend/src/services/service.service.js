import ImageKit from 'imagekit';
import dotenv from 'dotenv';
dotenv.config();

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "your_public_key",
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || process.env.image_kit || "your_private_key",
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || "https://ik.imagekit.io/your_endpoint"
});

export const uploadfile = async (buffer, fileName) => {
    try {
        const result = await imagekit.upload({
            file: buffer.toString("base64"),
            fileName: fileName || "image.jpg",
            useUniqueFileName: true
        });
        return result.url;
    } catch (error) {
        console.error("Error uploading to ImageKit:", error);
        throw error;
    }
};