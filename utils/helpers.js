module.exports = {
    format_time: (date)=> {
        return date.toLocaleTimeString ();
    },
    format_date:(date)=>{
        // using javascript date methods, get & format month,date,fullyear
        return `${new Date(date).getMonth() + 1 }/${new Date(date).getDate}/${new Date(date).getFullYear}`;
    },
};