import React from "react";
import { Box } from "@mui/system";
import CreateAccountForm from "./CreateAccountForm/CreateAccountForm";
const CreateAccount = () => {
  return (
    <div>
      <CreateAccountForm />
      <Box className="layout"></Box>
    </div>
  );
};

export default CreateAccount;
