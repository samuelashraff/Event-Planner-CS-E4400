

const modalStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& .MuiBox-root': {
        backgroundColor: '#062E3A',
        width: '70%',
        maxHeight: "100%",
        overFlowY: "auto",
        borderRadius: '10px',
        padding: '20px',
    }
}

const loginInputStyles = {
    root: {
      '& .MuiInputBase-root': {
        color: 'white', // Change the text color to white
      },
      '& .MuiInputLabel-root': {
        color: 'white', // Change the label color to white
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white', // Change the outline color to white
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white', // Change the outline color on hover to white
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white', // Change the outline color when focused to white
      },
    },
  }

  const registerButtonStyles = {
    root: {
      color: 'white',      // Set text color to white
      backgroundColor: '#1976d2', // Set background color to white
      '&:hover': {
        backgroundColor: 'white', // Set background color on hover to white
      },
    },
    label: {
      color: 'black',      // Set text color to black
    },
  }

  const registerSelectStyles = {
    formControl: {
      color: 'white', // Set text color to white
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white !important', // Set border color to white
      },
    },
    inputLabel: {
      color: 'white', // Set label color to white
    },
    select: {
      '&:before': {
        borderColor: 'white', // Set border color before selecting
      },
      '&:after': {
        borderColor: 'white', // Set border color after selecting
      },
      color: 'white', // Set selected option color to white
    },
    icon: {
      fill: 'white', // Set icon color to white
    },
  }

  const taskOverviewSelectStyles = {
    formControl: {
      color: 'white', // Set text color to white
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white !important', // Set border color to white
      },
    },
    inputLabel: {
      color: 'white', // Set label color to white
    },
    select: {
      '&:before': {
        borderColor: 'white', // Set border color before selecting
      },
      '&:after': {
        borderColor: 'white', // Set border color after selecting
      },
      color: 'white', // Set selected option color to white
    },
    icon: {
      fill: 'white', // Set icon color to white
    },
  }


export {
    modalStyle,
    loginInputStyles,
    registerButtonStyles,
    registerSelectStyles,
    taskOverviewSelectStyles
}