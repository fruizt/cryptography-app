const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x));

module.exports = {
	ceasarCypher: async function (req, res) {
		try {
			const { text, key } = req.body;
			currentText = text.toUpperCase().replace(/\s/g, '');;
			//console.log(alphabet,currentText)
			for( let index = 0; index < currentText.lenght; index ++){
				
			}
			return res.status(200).json({ msg: "yooo" });
		} catch (error) {
			return res.status(400).json({ msg: error.message });
		}
	},
};
