
//S3 CONFIG FILES
const config = {
    bucketName: process.env.REACT_APP_AWS_S3_BUCKET_NAME,
    region: process.env.REACT_APP_AWS_REGION,
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
};

export const deleteImagesFromAwsS3 = async () => {};
