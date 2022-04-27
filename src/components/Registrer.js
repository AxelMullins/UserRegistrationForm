import { useRef, useState, useEffect } from "react";
import { FaCheck, FaTimes, FaInfoCircle } from "react-icons/fa";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Registrer = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // If any hacker enable this btn with JS
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    console.log(user, pwd);
    setSuccess(true);
  };

  return (
    <section style={{ background: "black", padding: "100px 0" }}>
      <p ref={errRef} style={{ color: errMsg ? "red" : "green" }}>
        {errMsg}
      </p>
      <section
        style={{
          display: "grid",
          placeItems: "center",
          background: "white",
          width: "60vw",
          maxWidth: "500px",
          margin: "auto",
          padding: "30px 0 10px 0",
          borderRadius: "10px"
        }}
      >
        <h2>User Registration Form</h2>
        {success ? (
          <p style={{ color: "green", padding: "20px 0"}}>You have registered {user}</p>
        ) : (
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "100%",
              padding: "20px",
            }}
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="username">Username: </label>
              <span
                style={{
                  display: user ? "inline-block" : "none",
                }}
              >
                {validName ? (
                  <FaCheck color="green" />
                ) : (
                  <FaTimes color="red" />
                )}
              </span>
            </div>
            <input
              type="text"
              name="username"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              style={{
                border: `1px solid ${
                  validName ? "green" : user.length < 3 ? "black" : "red"
                }`,
                outline: "none",
              }}
            />
            <p
              id="uidnote"
              style={{
                display: userFocus && user && !validName ? "block" : "none",
                color: "orange",
              }}
            >
              <FaInfoCircle />
              4 to 24 characters.
              <br /> Must behin with a letter.
              <br /> Letters, numbers, underscores, hyphens allowed.
            </p>

            {/* Password */}

            <div>
              <label htmlFor="userpassword">Userpassword: </label>
              <span
                style={{
                  display: pwd ? "inline-block" : "none",
                }}
              >
                {validPwd ? <FaCheck color="green" /> : <FaTimes color="red" />}
              </span>
            </div>
            <input
              type="password"
              name="userpassword"
              id="userpassword"
              onChange={(e) => setPwd(e.target.value)}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pidnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              style={{
                border: `1px solid ${
                  validPwd ? "green" : pwd.length < 3 ? "black" : "red"
                }`,
                outline: "none",
              }}
            />
            <p
              id="pidnote"
              style={{
                display: pwdFocus && !validPwd ? "block" : "none",
                color: "orange",
              }}
            >
              <FaInfoCircle />
              8 to 24 characters.
              <br /> Must include uppercase and lowercase letters, a number and
              a special character.
              <br /> Allowed special characters: ! @ # $ %
            </p>

            {/*Confirm Password */}

            <div>
              <label htmlFor="userpasswordconfirm">
                Confirm Userpassword:{" "}
              </label>
              <span
                style={{
                  display: matchPwd ? "inline-block" : "none",
                }}
              >
                {validMatch ? (
                  <FaCheck color="green" />
                ) : (
                  <FaTimes color="red" />
                )}
              </span>
            </div>
            <input
              type="password"
              name="userpasswordconfirm"
              id="userpasswordconfirm"
              onChange={(e) => setMatchPwd(e.target.value)}
              required
              aria-invalid={matchPwd ? "false" : "true"}
              aria-describedby="vpidnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
              style={{
                border: `1px solid ${
                  matchPwd ? "green" : matchPwd.length < 3 ? "black" : "red"
                }`,
                outline: "none",
              }}
            />
            <p
              id="vpidnote"
              style={{
                display: matchFocus && !validMatch ? "block" : "none",
                color: "orange",
              }}
            >
              <FaInfoCircle />
              Password does not match
            </p>

            {/* Submit */}

            <button
              style={{
                background:
                  !validName || !validPwd || !validMatch ? "grey" : "green",
                color: "white",
                marginTop: "15px",
                padding: "10px",
                borderRadius: "4px"
              }}
              disabled={!validName || !validPwd || !validMatch ? true : false}
            >
              Sing Up
            </button>
          </form>
        )}
      </section>
      <FaCheck />
      <FaTimes />
    </section>
  );
};

export default Registrer;
