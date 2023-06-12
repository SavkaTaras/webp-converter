import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
const filesLocation = 'images/*.{jpg,png}';
const destinationFolder = 'done/';

imagemin([filesLocation], {
	destination: destinationFolder,
	plugins: [
		imageminWebp({
			quality: 50,
			// resize: {
			//   width: 1000,
			//   height: 0
			// }
		}),
	]
}).then(() => {
	console.log('Images optimized');
});
