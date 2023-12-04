import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import fs from "fs";
import path from "path";

const imageSizes = [320, 768, 1920];

const fileFolder = 'images';
const tempFolder = 'tmp';
const destinationFolder = 'gallery/';

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
		fs.mkdirSync(tempFolder);
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
		fs.mkdirSync(destinationFolder);
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