import winston from "winston";
import chalk from "chalk";

// 🎨 custom rang
const green = chalk.hex("#00ff88");

const logger = winston.createLogger({
	level: "debug",

	transports: [
		// 🎨 Console (custom ranglar)
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.printf(({ timestamp, level, message }) => {
					let coloredMessage = message;

					if (level === "info") {
						coloredMessage = green(message);
					} else if (level === "warn") {
						coloredMessage = chalk.yellow(message);
					} else if (level === "error") {
						coloredMessage = chalk.red(message);
					} else if (level === "debug") {
						coloredMessage = chalk.blue(message);
					}

					return `[${timestamp}] ${level.toUpperCase()}: ${coloredMessage}`;
				})
			),
		}),

		// 📁 File (rangsiz)
		new winston.transports.File({
			filename: "logs/error.log",
			level: "error",
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.json()
			),
		}),
		new winston.transports.File({
			filename: "logs/combined.log",
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.json()
			),
		}),
	],
});

export default logger;
