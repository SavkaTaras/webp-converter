import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import fs from "fs";
import path from "path";

const args = process.argv;
const argsSizes = args.splice(2);
const imageSizes = argsSizes.length > 0 ? argsSizes : [768, 1024, 1280, 1920];

const fileFolder = 'src';
// const filesLocation = `${fileFolder}/*.{jpg,jpeg,png,webp}`;
const tempFolder = 'tmp';
const destinationFolder = 'dist/images/';

const generateFiles = () => {
	fs.readdir(fileFolder, (err, files) => {
		if (err) throw err;

		for (const file of files) {
			imageSizes.forEach((el) => {
				const fileName = file.split('.');
				const extension = fileName[fileName.length - 1];
				fileName.pop();
				const newFileName = `${fileName.join('.')}-${el}.${extension}`;

				const fileFolderFile = `${fileFolder}/${file}`;
				const tempFolderNewFileName = `${tempFolder}/${newFileName}`;

				fs.copyFile(fileFolderFile, tempFolderNewFileName, (err) => {
					if (err) throw err;
				});

				imagemin([tempFolderNewFileName], {
					destination: destinationFolder,
					plugins: [
						imageminWebp({
							quality: `${el > 1024 ? 75 : 65}`,
							resize: {
								width: el,
								height: 0
							},
						}),
					]
				}).then(() => {
					fs.unlink(path.join(tempFolderNewFileName), (err) => {
						if (err) throw err;
					});
				});
			});
		}
	});
};

const checkTemp = () => {
	if (!fs.existsSync(tempFolder)) {
		fs.mkdirSync(tempFolder, { recursive: true });
		generateFiles();
	} else {
		fs.readdir(`${tempFolder}/`, (err, files) => {
			if (err) throw err;

			for (const file of files) {
				fs.unlink(path.join(`${tempFolder}/`, file), (err) => {
					if (err) throw err;
				});
			}
			generateFiles();
		});
	};
};

const cleanProcessedFolder = () => {
	if (!fs.existsSync(destinationFolder)) {
		fs.mkdirSync(destinationFolder, { recursive: true });
		checkTemp();
	} else {
		fs.readdir(`${destinationFolder}`, (err, files) => {
			if (err) throw err;

			for (const file of files) {
				fs.unlink(path.join(`${destinationFolder}`, file), (err) => {
					if (err) throw err;
				});
			}
			checkTemp();
		});
	};
};

cleanProcessedFolder();

// fs.readdir(destinationFolder, (err, files) => {
//   if (err) throw err;

//   for (const file of files) {
//     fs.unlink(path.join(destinationFolder, file), (err) => {
//       if (err) throw err;
//     });
//   }
// });

// imagemin([filesLocation], {
// 	destination: destinationFolder,
// 	plugins: [
// 		imageminWebp({
// 			quality: 75,
// 			resize: {
// 			  width: 540,
// 			  height: 0
// 			},
// 		}),
// 	]
// }).then(() => {
// 	console.log('Images optimized');
// });

// const sizes = [768, 1024, 1280, 1920];

// sizes.forEach((el) => {
// 	imagemin([filesLocation], {
// 		destination: `${destinationFolder}/${el}/`,
// 		plugins: [
// 			imageminWebp({
// 				quality: `${el > 1024 ? 75 : 60}`,
// 				resize: {
// 					width: `${el}`,
// 					height: 0
// 				},
// 			}),
// 		]
// 	}).then(() => {
// 		console.log('Images optimized');
// 	});
// });
