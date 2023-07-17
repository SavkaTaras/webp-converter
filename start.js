import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import fs from "fs";
import path from "path";
const filesLocation = 'images/*.{jpg,jpeg,png}';
const destinationFolder = 'processed/';

fs.readdir(destinationFolder, (err, files) => {
  if (err) throw err;

  for (const file of files) {
    fs.unlink(path.join(destinationFolder, file), (err) => {
      if (err) throw err;
    });
  }
});

imagemin([filesLocation], {
	destination: destinationFolder,
	plugins: [
		imageminWebp({
			quality: 60,
			// resize: {
			//   width: 1000,
			//   height: 0
			// }
		}),
	]
}).then(() => {
	console.log('Images optimized');
});
