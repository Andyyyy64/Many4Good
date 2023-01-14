const requests = {
  fetchacounting: import.meta.env.VITE_APP_Fetchacounting,
  addacounting: import.meta.env.VITE_APP_Addacounting,
  addincome: import.meta.env.VITE_APP_Addincome,
  changefoodlimit: import.meta.env.VITE_APP_Changefoodlimit,
  getloginuser: import.meta.env.VITE_APP_Getloginuser,
  adduser: import.meta.env.VITE_APP_Adduser,
  deleteacounting: import.meta.env.VITE_APP_Deleteacounting,
  deleteuser: import.meta.env.VITE_APP_Deleteuser,
  askAI: import.meta.env.VITE_APP_AskAI,
};

export default requests;
