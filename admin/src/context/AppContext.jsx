import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {

  const calculateAge = (dob)=>{
    let today = new Date();
    let birth = new Date(dob);
    const age = today.getFullYear() - birth.getFullYear();
    
    return age;
  }

  const months = [ "",
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const slotDateFormat = (slotDate) => {
  const slotDataArray = slotDate.split("-");
  return `${slotDataArray[2]} ${months[parseInt(slotDataArray[1]) ]} ${slotDataArray[0]}`
};

  const value = {
    calculateAge,
    slotDateFormat
  };
  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;