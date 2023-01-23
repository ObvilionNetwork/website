export const defaultStyles = {
    control: (base, state) => ({
        ...base,
        backgroundColor: '#18191a',
        borderColor: '#2e2f34',
        color: '#d3d3d3',
        padding: '5px 10px',
        borderRadius: '5px',
        //height: '50px',
        '&:hover':
            {
                border: '1px solid #0679A8',
            },
        '&:focus':
            {
                boxShadow: '0 0 0.8rem rgb(121 121 121 / 24%)'
            }
    }),
    multiValue: (base) => ({
        ...base,
        background: 'none',
        margin: '3px',
    }),
    multiValueLabel: (base) => ({
        ...base,
        backgroundColor: '#2e2f34',
        color: 'white',
        fontSize: '105%'
    }),
    multiValueRemove: (base) => ({
        ...base,
        backgroundColor: '#373a48',
    }),
    indicatorSeparator: (base) => ({}),
    input: (base) => ({
        ...base,
        color: '#e0e0e0',
    }),
    menuList: (base) => ({
        ...base,
        backgroundColor: '#18191a',
    }),
    option: (base) => ({
        "label": "option",
        "cursor": "default",
        "display": "block",
        "fontSize": "inherit",
        "width": "100%",
        "userSelect": "none",
        "WebkitTapHighlightColor": "rgba(0, 0, 0, 0)",
        "backgroundColor": "transparent",
        "padding": "8px 12px",
        ":hover": {
            "backgroundColor": "#29292c"
        },
        "boxSizing": "border-box",
        color: '#b0b0b0'
    }),

};
