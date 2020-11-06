import S3 from "aws-sdk/clients/s3";
const {
  REACT_APP_AWS_ACCESS_KEY_ID: accessKeyId,
  REACT_APP_AWS_SECRET_ACCESS_KEY: secretAccessKey,
  REACT_APP_AWS_REGION: region,
  REACT_APP_AWS_S3_APP_IMAGES_BUCKET: Bucket,
} = process.env;
const s3 = new S3({
  apiVersion: "2006-03-01",
  accessKeyId,
  secretAccessKey,
  region,
});

const deleteS3Object = (fileName) =>
  s3.deleteObject(
    {
      Bucket,
      Key: fileName,
    },
    (err, data) => {
      if (err) throw err;
    }
  );

export default deleteS3Object;
