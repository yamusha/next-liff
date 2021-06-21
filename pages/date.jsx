
import thLocale from "date-fns/locale/th";
import DateFnsUtils from "@date-io/date-fns";
import React, { useState, useCallback, useEffect } from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import dayjs from "dayjs";
import thai from "dayjs/locale/th";
import relativeTime from "dayjs/plugin/relativeTime";
import buddhistEra from "dayjs/plugin/buddhistEra";
import DateRangeIcon from '@material-ui/icons/DateRange';
import TextField from '@material-ui/core/TextField';

dayjs.locale(thai);
dayjs.extend(relativeTime);
dayjs.extend(buddhistEra);

const localeMap = {
  th: thLocale,
};


class thLocalizedUtils extends DateFnsUtils {
  getYearText(date){
    return dayjs(date)
    .add(543, 'year')
    .format('YYYY')
  }
  getCalendarHeaderText(date){
    return dayjs(date)
    .add(543, 'year')
    .format('MMMM YYYY')
  }
  getDatePickerHeaderText(date) {
    // return format(date, "dd MMM yyyy", { locale: this.locale });
    return dayjs(date).format('dddd DD MMM')
  }
}

const localeUtilsMap = {
  th: thLocalizedUtils,
};

const localeFormatMap = {
  th: "dd-MM-yyyy",
};

const localeCancelLabelMap = {
  th: "ยกเลิก",
};

function DateFnsLocalizationExample() {
  const [locale, setLocale] = useState("th");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDate, handleDateChange] = useState(new Date());
  const [showDate, setShowDate] = useState(new Date())
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuOpen = useCallback(e => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  }, []);

  const selectLocale = useCallback(locale => {
    setLocale(locale);
    setAnchorEl(null);
  }, []);

  useEffect(() => {
    setShowDate(dayjs(selectedDate).format("DD/MM/BBBB"))
    console.log(selectedDate);
    console.log(showDate);
  }, [selectedDate])

  return (
    <MuiPickersUtilsProvider utils={localeUtilsMap[locale]} locale={localeMap[locale]}>
      <KeyboardDatePicker
      open={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
        value={selectedDate}
        onChange={handleDateChange}
        format={localeFormatMap[locale]}
        cancelLabel="ยกเลิก"
        okLabel="ตกลง"
        TextFieldComponent={() => null}
      />
      <TextField id="outlined-basic" onClick={() => setIsOpen(true)} label="Outlined" InputProps={{
            readOnly: true,
          }} value={showDate} variant="outlined" size="small" />
      <IconButton onClick={() => setIsOpen(true)}> <DateRangeIcon /> </IconButton>
    </MuiPickersUtilsProvider>
  );
}

export default DateFnsLocalizationExample;
