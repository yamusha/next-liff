import React, { useEffect, useState } from "react";
import {
  Router,
  useRouter,
} from "next/router";
import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Select from "react-select";
import schools2 from "../constants/optschools.json";

import thLocale from "date-fns/locale/th";
import DateFnsUtils from "@date-io/date-fns";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import {
  DatePicker,
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import dayjs from "dayjs";
import thai from "dayjs/locale/th";
import relativeTime from "dayjs/plugin/relativeTime";
import buddhistEra from "dayjs/plugin/buddhistEra";
import DateRangeIcon from "@material-ui/icons/DateRange";

dayjs.locale(thai);
dayjs.extend(relativeTime);
dayjs.extend(buddhistEra);

const localeMap = {
  th: thLocale,
};

class thLocalizedUtils extends DateFnsUtils {
  getYearText(date) {
    return dayjs(date).add(543, "year").format("YYYY");
  }
  getCalendarHeaderText(date) {
    return dayjs(date).add(543, "year").format("MMMM YYYY");
  }
  getDatePickerHeaderText(date) {
    // return format(date, "dd MMM yyyy", { locale: this.locale });
    return dayjs(date).format("dddd DD MMM");
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

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: "4px",
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
  btnBlock: {
    margin: "2px",
    width: "100%",
  },
  formClass: {
    marginTop: "10px",
    marginBottom: "10px",
  },
}));

const options = [
  { value: "ข้าราชการ(สพป.)", label: "ข้าราชการ(สพป.)" },
  { value: "ลูกจ้างชั่วคราว(สพป.)", label: "ลูกจ้างชั่วคราว(สพป.)" },
  { value: "ผอ./รอง/ครู (รร.ข้าราชการ)", label: "ผอ./รอง/ครู (รร.ข้าราชการ)" },
  { value: "พนักงานราชการ", label: "พนักงานราชการ" },
  { value: "ครูอัตราจ้าง", label: "ครูอัตราจ้าง" },
  { value: "ลูกจ้างประจำ", label: "ลูกจ้างประจำ" },
  { value: "ธุรการโรงเรียน", label: "ธุรการโรงเรียน" },
];

const Login = (props) => {
  const classes = useStyles();

  const [warning, setwarning] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("")
  const [lineUId, setlineUid] = useState("");
  const [personId, setPersonId] = useState("");
  const [position, setPosition] = useState("")
  const [orgId, setOrgId] = useState("")

  const [locale, setLocale] = useState("th");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDate, handleDateChange] = useState(new Date());
  const [showDate, setShowDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setShowDate(dayjs(selectedDate).format("DD/MM/BBBB"));
    console.log(selectedDate);
    console.log(showDate);
  }, [selectedDate]);

  useEffect(()=> {
    setlineUid(props.profile.userId)
    setEmail(props.email)
  }, [])

  const router = useRouter();

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#fff",
    }),
    option: (provided, state) => ({
      ...provided,
      color: "#000",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#000",
    }),
    input: (base) => ({
      ...base,
      color: "#000",
    }),
  };

  // const email = "";
  // console.log(props);
  const registerUser = async (event) => {
    event.preventDefault();
    // alert(event.target.name.value)
    // console.log(event.target);
    console.log(firstName, lastName, email, lineUId, personId, selectedDate, mobile, orgId, position);
    const res = await fetch("/api/phichit2liff-api/index.php/users/register", {
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobile: mobile,
        uid: lineUId,
        personId: personId,
        orgId: orgId,
        position: position,
        birthDate: selectedDate
      }),
      // body: JSON.stringify({
      //   firstName: event.target.firstName.value,
      //   lastName: event.target.lastName.value,
      //   email: event.target.email.value,
      //   mobile: event.target.mobile.value,
      //   uid: props.profile.userId,
      // }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const result = await res.json();
    if (result.status === "success") {
      router.push("/");
    } else {
      setwarning(true);
    }
    // result.user => 'Ada Lovelace'
  };

  return (
    <>
      <Head>Register</Head>
      <Container maxWidth="sm">
        <form onSubmit={registerUser} className={classes.formClass}>
          <div>
            <FormControl fullWidth className={classes.margin}>
              <TextField
                required
                id="personId"
                label="รหัสบัตรประชาชน (13 หลัก)"
                // helperText="ชื่อ"
                name="personId"
                variant="outlined"
                size="small"
                InputLabelProps={{ style: { fontFamily: "Sarabun" } }}
                inputProps={{ style: { fontFamily: "Sarabun" } }}
                onChange={(e) => {
                  // console.log(e.target.value);
                  setPersonId(e.target.value);
                }}
              />
            </FormControl>
          </div>
          <div>
            <FormControl fullWidth className={classes.margin}>
              <TextField
                required
                id="firstName"
                label="ชื่อ"
                // helperText="ชื่อ"
                name="firstName"
                variant="outlined"
                size="small"
                InputLabelProps={{ style: { fontFamily: "Sarabun" } }}
                inputProps={{ style: { fontFamily: "Sarabun" } }}
                onChange={(e) => {
                  // console.log(e.target.value);
                  setFirstName(e.target.value);
                }}
              />
            </FormControl>
          </div>
          <div>
            <FormControl fullWidth className={classes.margin}>
              <TextField
                required
                id="lastName"
                label="นามสกุล"
                // helperText="ชื่อ"
                name="lastName"
                variant="outlined"
                size="small"
                InputLabelProps={{ style: { fontFamily: "Sarabun" } }}
                inputProps={{ style: { fontFamily: "Sarabun" } }}
                onChange={(e) => {
                  // console.log(e.target.value);
                  setLastName(e.target.value);
                }}
              />
            </FormControl>
          </div>
          <div>
            <FormControl fullWidth className={classes.margin}>
              <TextField
                required
                id="mobile"
                label="หมายเลขโทรศัพท์"
                // helperText="ชื่อ"
                name="mobile"
                variant="outlined"
                size="small"
                InputLabelProps={{ style: { fontFamily: "Sarabun" } }}
                inputProps={{ style: { fontFamily: "Sarabun" } }}
                onChange={(e) => {
                  // console.log(e.target.value);
                  setMobile(e.target.value);
                }}
              />
            </FormControl>
          </div>
          <div>
          <FormControl fullWidth className={classes.margin}>
            <MuiPickersUtilsProvider
              utils={localeUtilsMap[locale]}
              locale={localeMap[locale]}
            >
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
              <TextField
                id="birthDate"
                onClick={() => setIsOpen(true)}
                label="วันเกิด"
                InputProps={{
                  readOnly: true,
                }}
                value={showDate}
                variant="outlined"
                size="small"
                InputLabelProps={{ style: { fontFamily: "Sarabun" } }}
                inputProps={{ style: { fontFamily: "Sarabun" } }}
                required
              />
              {/* <IconButton onClick={() => setIsOpen(true)}>
                {" "}
                <DateRangeIcon />{" "}
              </IconButton> */}
            </MuiPickersUtilsProvider>
            </FormControl>
          </div>
          <div>
            <FormControl fullWidth className={classes.margin}>
              <Select
                instanceId="orgId"
                name="orgId"
                styles={customStyles}
                options={schools2}
                onChange={(e) => setOrgId(e.value)}
                // {...register("users", { required: true })}
                placeholder="เลือกหน่วยงาน/โรงเรียน"
                required
              />
            </FormControl>
          </div>
          <div>
            <FormControl fullWidth className={classes.margin}>
              <Select
                instanceId="position"
                name="position"
                styles={customStyles}
                // defaultValue={options[0]}
                options={options}
                onChange={(e) => setPosition(e.value)}
                // {...register("users", { required: true })}
                placeholder="เลือกตำแหน่ง"
                required
              />
            </FormControl>
          </div>
          

          <div>
            <Button
              variant="contained"
              className={classes.btnBlock}
              type="submit"
              color="primary"
              style={{ fontSize: '18px', fontFamily: 'Sarabun' }}
            >
              ลงทะเบียน
            </Button>
          </div>
        </form>
      </Container>
    </>
  );
};

export default Login;
