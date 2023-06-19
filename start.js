import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
const filesLocation = 'images/*.{jpg,jpeg,png}';
const destinationFolder = 'processed/';

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
