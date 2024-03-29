import React, { useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "blue",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

export const InformationModal = ({ onDismiss, information, state }) => {
	const [open, setOpen] = React.useState(state);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	console.log(">> open:", open);

	useEffect(() => {
		setOpen(state)
	}, []);
	console.log(information);
	return (
		<>
			<div>
				{/* <Button onClick={handleOpen}>Open modal</Button> */}
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={style}>
						<Typography id="modal-modal-title" variant="h6" component="h2">
							Text in a modal
						</Typography>
						<Typography id="modal-modal-description" sx={{ mt: 2 }}>
							Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
						</Typography>
					</Box>
				</Modal>
			</div>
		</>
	);
};
