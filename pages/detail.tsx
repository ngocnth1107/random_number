import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import prisma from "../lib/prisma";

const FormKQXS = ({ kqxs }) => {
  const date = new Date();
  const weekdays = [
    "Chủ nhật",
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy",
  ];
  const weekday = weekdays[date.getDay()];
  const formattedDate = `Ngày ${date.getDate().toString().padStart(2, "0")}/${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;

  const serverDate = `${weekday} ${formattedDate}`;

  const timeNow = Date.now();
  const [formVisible, setFormVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentDate, setCurrentDate] = useState<string>(serverDate);
  const [randomNumber, setRandomNumber] = useState("");
  const [showExtraOptions3, setShowExtraOptions3] = useState(false);
  const [showExtraOptions4, setShowExtraOptions4] = useState(false);
  const [showExtraOptions6, setShowExtraOptions6] = useState(false);
  // const [expirationTime, setExpirationTime] = useState(0);
  const [formState, setFormState] = useState({
    giai: "",
    giai3: "",
    giai4: "",
    giai6: "",
    so: "",
  });

  const [dataApi, setDataApi] = useState(kqxs);

  const toggleFormChangeResult = () => {
    setFormVisible(!formVisible);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const weekdays = [
        "Chủ nhật",
        "Thứ hai",
        "Thứ ba",
        "Thứ tư",
        "Thứ năm",
        "Thứ sáu",
        "Thứ bảy",
      ];
      const weekday = weekdays[date.getDay()];
      const formattedDate = `Ngày ${date
        .getDate()
        .toString()
        .padStart(2, "0")}/${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${date.getFullYear()}`;

      setCurrentDate(`${weekday} - ${formattedDate}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const generateRandomNumber = () => {
    let randNum = Math.floor(Math.random() * 10000);
    return randNum.toString().padStart(4, "0000");
  };

  useEffect(() => {
    const updateNumbers = () => {
      setRandomNumber(generateRandomNumber());
    };

    const intervalId = setInterval(updateNumbers, 100);
    updateNumbers();
    return () => clearInterval(intervalId);
  }, []);

  const displayRandomNumber = async (
    elementId: string,
    duration: number,
    soThayDoi: string
  ) => {
    const endTime = timeNow + duration;
    const data = {
      [elementId]: soThayDoi,
      expirationTime: endTime.toString(),
      currentLoading: elementId,
    };

    setDataApi({
      ...dataApi,
      ...data,
    });

    const body = data;
    try {
      await fetch("/api/kqxs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const giai = formData.get("giai") as string;
    const giai3 = formData.get("giai3") as string;
    const giai4 = formData.get("giai4") as string;
    const giai6 = formData.get("giai6") as string;
    const so = formData.get("so") as string;

    setFormState({
      ...formState,
      giai,
      giai3,
      giai4,
      giai6,
      so,
    });

    const duration = 50000;
    switch (giai) {
      case "giaidb":
      case "giai1":
      case "giai2":
      case "giai5":
      case "giai7":
      case "giai8":
        displayRandomNumber(giai, duration, so);
        break;
      case "giai3":
        displayRandomNumber(giai3, duration, so);
        break;
      case "giai4":
        displayRandomNumber(giai4, duration, so);
        break;
      case "giai6":
        displayRandomNumber(giai6, duration, so);
        break;
      default:
        break;
    }
  };

  const handleInputChange = () => {
    setFormState({
      giai: "",
      giai3: "",
      giai4: "",
      giai6: "",
      so: "",
    });
  };

  const checkSelection = (
    event: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setFormState({
      giai: "",
      giai3: "",
      giai4: "",
      giai6: "",
      so: "",
    });
    const { value } = event.target;

    switch (value) {
      case "giai3":
        setShowExtraOptions3(true);
        setShowExtraOptions4(false);
        setShowExtraOptions6(false);
        break;
      case "giai4":
        setShowExtraOptions4(true);
        setShowExtraOptions3(false);
        setShowExtraOptions6(false);
        break;
      case "giai6":
        setShowExtraOptions6(true);
        setShowExtraOptions4(false);
        setShowExtraOptions3(false);
        break;
      default:
        setShowExtraOptions6(false);
        setShowExtraOptions4(false);
        setShowExtraOptions3(false);
        break;
    }
  };

  const resetResult = async () => {
    const data = {
      giaidb: '',
      giai1: '',
      giai2: '',
      giai3_1: '',
      giai3_2: '',
      giai4_1: '',
      giai4_2: '',
      giai4_3: '',
      giai4_4: '',
      giai4_5: '',
      giai4_6: '',
      giai4_7: '',
      giai5: '',
      giai6_1: '',
      giai6_2: '',
      giai6_3: '',
      giai7: '',
      giai8: '',
      expirationTime: '',
      currentLoading: '',
    };

    setDataApi(data);

    const body = data;
    try {
      await fetch("/api/kqxs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
    }
    setFormState({
      giai: "",
      giai3: "",
      giai4: "",
      giai6: "",
      so: "",
    });
  };

  const isShowThreeDot = useCallback(
    (giai: string) => {
      return dataApi?.[giai] === null || dataApi?.[giai] === "";
    },
    [dataApi]
  );

  const isShowNumberLoading = useCallback(
    (giai: string) => {
      return (
        dataApi?.[giai] &&
        dataApi?.currentLoading === giai &&
        +dataApi?.expirationTime >= timeNow
      );
    },
    [dataApi, timeNow]
  );

  return (
    <>
      <div className="page">
        <main className="pagebody">
          <div id="dnw-page">
            <div id="dnw-main">
              <div>
                <div className="dnw-sheet">
                  <div className="dnw-sheet-body">
                    <div className="dnw-nav">
                      <div className="dnw-nav-l">
                        <div className="dnw-nav-r">
                          <div style={{ clear: "both" }}></div>
                          <div>
                            <img
                              src="https://e7.pngegg.com/pngimages/788/957/png-clipart-graphics-font-line-google-adwords-banner-orange-google-adwords-banner.png"
                              alt="image"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="dnw-content-layout">
                    <div className="dnw-content-main" id="dnw-content-main">
                      <div className="dnw-content-main-l">
                        <div className="dnw-content-main-r">
                          <table width="100%" style={{ border: "0" }}>
                            <tr>
                              <td className="left">
                                <div>
                                  {" "}
                                  <img
                                    src="https://img.minhngoc.net/ads/tructiep-250x360.gif"
                                    alt="img-left"
                                    height="500"
                                    width="100%"
                                  />
                                </div>
                                <div className="clear"></div>
                                <div className="clear"></div>
                                {formVisible && (
                                  <div id="thay_doi_ket_qua">
                                    <div className="box_formthongkexoso">
                                      <h3 className="slecttk">
                                        Thay đổi kết quả xổ số
                                      </h3>
                                      <div>
                                        <div>
                                          <form
                                            id="doveso"
                                            name="doveso"
                                            method="get"
                                            onSubmit={handleSubmit}
                                          >
                                            <table style={{ width: "100%" }}>
                                              <tr>
                                                <td
                                                  align="left"
                                                  style={{
                                                    whiteSpace: "nowrap",
                                                  }}
                                                >
                                                  Giải:
                                                </td>
                                                <td
                                                  align="left"
                                                  style={{
                                                    whiteSpace: "nowrap",
                                                  }}
                                                >
                                                  <select
                                                    onChange={checkSelection}
                                                    name="giai"
                                                    id="frm_dove_giai"
                                                    style={{ width: "100%" }}
                                                  >
                                                    <option value=""></option>
                                                    <option value="giaidb">
                                                      Giải đặc biệt
                                                    </option>
                                                    <option value="giai1">
                                                      Giải nhất
                                                    </option>
                                                    <option value="giai2">
                                                      Giải nhì
                                                    </option>
                                                    <option value="giai3">
                                                      Giải ba
                                                    </option>
                                                    <option value="giai4">
                                                      Giải tư
                                                    </option>
                                                    <option value="giai5">
                                                      Giải năm
                                                    </option>
                                                    <option value="giai6">
                                                      Giải sáu
                                                    </option>
                                                    <option value="giai7">
                                                      Giải bảy
                                                    </option>
                                                    <option value="giai8">
                                                      Giải tám
                                                    </option>
                                                  </select>
                                                </td>
                                              </tr>
                                              {showExtraOptions3 && (
                                                <tr id="extraOptionsThree">
                                                  <td
                                                    align="left"
                                                    style={{
                                                      whiteSpace: "nowrap",
                                                    }}
                                                  >
                                                    Extra:
                                                  </td>
                                                  <td
                                                    align="left"
                                                    style={{
                                                      whiteSpace: "nowrap",
                                                    }}
                                                  >
                                                    <select
                                                      id="thay_doi_giai_3"
                                                      style={{ width: "100%" }}
                                                      name="giai3"
                                                      onChange={
                                                        handleInputChange
                                                      }
                                                    >
                                                      <option value=""></option>
                                                      <option value="giai3_1">
                                                        Giải 3-1
                                                      </option>
                                                      <option value="giai3_2">
                                                        Giải 3-2
                                                      </option>
                                                    </select>
                                                  </td>
                                                </tr>
                                              )}
                                              {showExtraOptions4 && (
                                                <tr id="extraOptionsFour">
                                                  <td
                                                    align="left"
                                                    style={{
                                                      whiteSpace: "nowrap",
                                                    }}
                                                  >
                                                    Extra:
                                                  </td>
                                                  <td
                                                    align="left"
                                                    style={{
                                                      whiteSpace: "nowrap",
                                                    }}
                                                  >
                                                    <select
                                                      id="thay_doi_giai_4"
                                                      style={{ width: "100%" }}
                                                      name="giai4"
                                                      onChange={
                                                        handleInputChange
                                                      }
                                                    >
                                                      <option value=""></option>
                                                      <option value="giai4_1">
                                                        Giải 4-1
                                                      </option>
                                                      <option value="giai4_2">
                                                        Giải 4-2
                                                      </option>
                                                      <option value="giai4_3">
                                                        Giải 4-3
                                                      </option>
                                                      <option value="giai4_4">
                                                        Giải 4-4
                                                      </option>
                                                      <option value="giai4_5">
                                                        Giải 4-5
                                                      </option>
                                                      <option value="giai4_6">
                                                        Giải 4-6
                                                      </option>
                                                      <option value="giai4_7">
                                                        Giải 4-7
                                                      </option>
                                                    </select>
                                                  </td>
                                                </tr>
                                              )}
                                              {showExtraOptions6 && (
                                                <tr id="extraOptionsSix">
                                                  <td
                                                    align="left"
                                                    style={{
                                                      whiteSpace: "nowrap",
                                                    }}
                                                  >
                                                    Extra:
                                                  </td>
                                                  <td
                                                    align="left"
                                                    style={{
                                                      whiteSpace: "nowrap",
                                                    }}
                                                  >
                                                    <select
                                                      id="thay_doi_giai_6"
                                                      style={{ width: "100%" }}
                                                      name="giai6"
                                                      onChange={
                                                        handleInputChange
                                                      }
                                                    >
                                                      <option value=""></option>
                                                      <option value="giai6_1">
                                                        Giải 6-1
                                                      </option>
                                                      <option value="giai6_2">
                                                        Giải 6-2
                                                      </option>
                                                      <option value="giai6_3">
                                                        Giải 6-3
                                                      </option>
                                                    </select>
                                                  </td>
                                                </tr>
                                              )}
                                              <tr>
                                                <td
                                                  align="left"
                                                  style={{
                                                    whiteSpace: "nowrap",
                                                  }}
                                                >
                                                  Số:
                                                </td>
                                                <td>
                                                  <input
                                                    name="so"
                                                    id="so_thay_doi"
                                                    onChange={handleInputChange}
                                                  />
                                                </td>
                                              </tr>
                                              <tr>
                                                <td
                                                  align="left"
                                                  style={{
                                                    whiteSpace: "nowrap",
                                                  }}
                                                >
                                                  <button
                                                    type="submit"
                                                    className="btnxemthongke"
                                                  >
                                                    Thay đổi
                                                  </button>
                                                </td>
                                                <td
                                                  align="left"
                                                  style={{
                                                    whiteSpace: "nowrap",
                                                  }}
                                                >
                                                  <button
                                                    onClick={() =>
                                                      resetResult()
                                                    }
                                                    type="reset"
                                                    className="btnxemthongke"
                                                  >
                                                    Reset
                                                  </button>
                                                </td>
                                              </tr>
                                            </table>
                                          </form>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="clear"></div>
                                  </div>
                                )}
                              </td>
                              <td>
                                <div id="right_main">
                                  <table width="100%">
                                    <tr>
                                      <td className="main">
                                        <div className="mainbody">
                                          <div id="noidung">
                                            <h1 className="pagetitle">
                                              XỔ SỐ Sóc Trăng
                                            </h1>
                                            <div>
                                              <div>
                                                <div className="clear"></div>
                                              </div>
                                            </div>

                                            <div>
                                              <div className="box_kqxs">
                                                <div
                                                  className="top"
                                                  style={{
                                                    backgroundColor: "#b22222",
                                                  }}
                                                >
                                                  <div className="bkl">
                                                    <div className="bkr">
                                                      <div className="bkm">
                                                        <div className="icon">
                                                          <span className="icon_new"></span>
                                                        </div>
                                                        <div className="title">
                                                          <span>
                                                            KẾT QUẢ XỔ SỐ Sóc
                                                            Trăng
                                                          </span>
                                                        </div>
                                                        <div className="iconright">
                                                          <a
                                                            className="icontk"
                                                            title="Xem thống kê chi tiết xổ số Sóc Trăng"
                                                            target="_blank"
                                                            href="/thong-ke-xo-so/tan-suat-chi-tiet-tinh.html?id=soc-trang"
                                                          ></a>
                                                        </div>
                                                        <div className="iconrightkq">
                                                          <a
                                                            href="/ket-qua-xo-so/mien-nam/05-02-2025.html"
                                                            title="Xem thêm kết quả xổ số Miền Nam"
                                                          >
                                                            XEM BẢNG MIỀN...
                                                          </a>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="content">
                                                  <table
                                                    className="bkqtinhmiennam"
                                                    width="100%"
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td colSpan={2}>
                                                          <div
                                                            className="ngay"
                                                            style={{
                                                              display: "flex",
                                                              justifyContent:
                                                                "space-between",
                                                            }}
                                                          >
                                                            <span className="currentDate">
                                                              {currentDate}
                                                            </span>
                                                            <span
                                                              style={{
                                                                paddingRight:
                                                                  "10px",
                                                              }}
                                                              id="clock"
                                                            >
                                                              {currentTime.toLocaleTimeString(
                                                                "en-GB",
                                                                {
                                                                  hour12: false,
                                                                }
                                                              )}
                                                            </span>
                                                          </div>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td>
                                                          <table
                                                            style={{
                                                              width: "100%",
                                                            }}
                                                            className="box_kqxs_content"
                                                          >
                                                            <tbody>
                                                              <tr>
                                                                <td className="giaidbl">
                                                                  <a href="/thong-tin/co-cau-giai-thuong-mien-nam.html">
                                                                    Giải ĐB
                                                                  </a>
                                                                </td>
                                                                <td className="giaidb">
                                                                  <div id="giaidb">
                                                                    {isShowThreeDot(
                                                                      "giaidb"
                                                                    ) && (
                                                                      <img
                                                                        src="https://www.minhngoc.net.vn//template/2016/images/choxoso.gif"
                                                                        alt="Loading..."
                                                                      />
                                                                    )}
                                                                    {isShowNumberLoading(
                                                                      "giaidb"
                                                                    ) ? (
                                                                      <div
                                                                        style={{
                                                                          width:
                                                                            "100%",
                                                                        }}
                                                                        id="random_number_loading"
                                                                      >
                                                                        {
                                                                          randomNumber
                                                                        }
                                                                      </div>
                                                                    ) : (
                                                                      <div
                                                                        style={{
                                                                          width:
                                                                            "100%",
                                                                        }}
                                                                      >
                                                                        {
                                                                          dataApi?.giaidb
                                                                        }
                                                                      </div>
                                                                    )}
                                                                  </div>
                                                                </td>
                                                              </tr>
                                                              <tr>
                                                                <td className="giai1l">
                                                                  Giải nhất
                                                                </td>
                                                                <td className="giai1">
                                                                  <div id="giai1">
                                                                    {isShowThreeDot(
                                                                      "giai1"
                                                                    ) && (
                                                                      <img
                                                                        src="https://www.minhngoc.net.vn//template/2016/images/choxoso.gif"
                                                                        alt="Loading..."
                                                                      />
                                                                    )}
                                                                    {isShowNumberLoading(
                                                                      "giai1"
                                                                    ) ? (
                                                                      <div
                                                                        style={{
                                                                          width:
                                                                            "100%",
                                                                        }}
                                                                        id="random_number_loading"
                                                                      >
                                                                        {
                                                                          randomNumber
                                                                        }
                                                                      </div>
                                                                    ) : (
                                                                      <div
                                                                        style={{
                                                                          width:
                                                                            "100%",
                                                                        }}
                                                                      >
                                                                        {
                                                                          dataApi?.giai1
                                                                        }
                                                                      </div>
                                                                    )}
                                                                  </div>
                                                                </td>
                                                              </tr>
                                                              <tr>
                                                                <td className="giai2l">
                                                                  Giải
                                                                  nh&igrave;
                                                                </td>
                                                                <td className="giai2">
                                                                  <div id="giai2">
                                                                    {isShowThreeDot(
                                                                      "giai2"
                                                                    ) && (
                                                                      <img
                                                                        src="https://www.minhngoc.net.vn//template/2016/images/choxoso.gif"
                                                                        alt="Loading..."
                                                                      />
                                                                    )}
                                                                    {isShowNumberLoading(
                                                                      "giai2"
                                                                    ) ? (
                                                                      <div
                                                                        style={{
                                                                          width:
                                                                            "100%",
                                                                        }}
                                                                        id="random_number_loading"
                                                                      >
                                                                        {
                                                                          randomNumber
                                                                        }
                                                                      </div>
                                                                    ) : (
                                                                      <div
                                                                        style={{
                                                                          width:
                                                                            "100%",
                                                                        }}
                                                                      >
                                                                        {
                                                                          dataApi?.giai2
                                                                        }
                                                                      </div>
                                                                    )}
                                                                  </div>
                                                                </td>
                                                              </tr>
                                                              <tr>
                                                                <td
                                                                  id="giai3l"
                                                                  className="giai3l"
                                                                >
                                                                  Giải ba
                                                                </td>
                                                                <td className="giai3">
                                                                  <div id="giai3_1">
                                                                    {isShowThreeDot(
                                                                      "giai3_1"
                                                                    ) && (
                                                                      <img
                                                                        src="https://www.minhngoc.net.vn//template/2016/images/choxoso.gif"
                                                                        alt="Loading..."
                                                                      />
                                                                    )}
                                                                    {isShowNumberLoading(
                                                                      "giai3_1"
                                                                    ) ? (
                                                                      <div
                                                                        style={{
                                                                          width:
                                                                            "100%",
                                                                        }}
                                                                        id="random_number_loading"
                                                                      >
                                                                        {
                                                                          randomNumber
                                                                        }
                                                                      </div>
                                                                    ) : (
                                                                      <div
                                                                        style={{
                                                                          width:
                                                                            "100%",
                                                                        }}
                                                                      >
                                                                        {
                                                                          dataApi?.giai3_1
                                                                        }
                                                                      </div>
                                                                    )}
                                                                  </div>

                                                                  <div id="giai3_2">
                                                                    {isShowThreeDot(
                                                                      "giai3_2"
                                                                    ) && (
                                                                      <img
                                                                        src="https://www.minhngoc.net.vn//template/2016/images/choxoso.gif"
                                                                        alt="Loading..."
                                                                      />
                                                                    )}
                                                                    {isShowNumberLoading(
                                                                      "giai3_2"
                                                                    ) ? (
                                                                      <div
                                                                        style={{
                                                                          width:
                                                                            "100%",
                                                                        }}
                                                                        id="random_number_loading"
                                                                      >
                                                                        {
                                                                          randomNumber
                                                                        }
                                                                      </div>
                                                                    ) : (
                                                                      <div
                                                                        style={{
                                                                          width:
                                                                            "100%",
                                                                        }}
                                                                      >
                                                                        {
                                                                          dataApi?.giai3_2
                                                                        }
                                                                      </div>
                                                                    )}
                                                                  </div>
                                                                </td>
                                                              </tr>
                                                              <tr>
                                                                <td
                                                                  id="giai4l"
                                                                  className="giai4l"
                                                                >
                                                                  Giải tư
                                                                </td>
                                                                <td className="giai4">
                                                                  <div id="giai4_1">
                                                                    {isShowThreeDot(
                                                                      "giai4_1"
                                                                    ) && (
                                                                      <img
                                                                        src="https://www.minhngoc.net.vn//template/2016/images/choxoso.gif"
                                                                        alt="Loading..."
                                                                      />
                                                                    )}
                                                                    {isShowNumberLoading(
                                                                      "giai4_1"
                                                                    ) ? (
                                                                      <div
                                                                        style={{
                                                                          width:
                                                                            "100%",
                                                                        }}
                                                                        id="random_number_loading"
                                                                      >
                                                                        {
                                                                          randomNumber
                                                                        }
                                                                      </div>
                                                                    ) : (
                                                                      <div
                                                                        style={{
                                                                          width:
                                                                            "100%",
                                                                        }}
                                                                      >
                                                                        {
                                                                          dataApi?.giai4_1
                                                                        }
                                                                      </div>
                                                                    )}
                                                                  </div>

                                                                  <div id="giai4_2">
                                                                    {isShowThreeDot(
                                                                      "giai4_2"
                                                                    ) && (
                                                                      <img
                                                                        src="https://www.minhngoc.net.vn//template/2016/images/choxoso.gif"
                                                                        alt="Loading..."
                                                                      />
                                                                    )}
                                                                    {isShowNumberLoading(
                                                                      "giai4_2"
                                                                    ) ? (
                                                                      <div
                                                                        style={{
                                                                          width:
                                                                            "100%",
                                                                        }}
                                                                        id="random_number_loading"
                                                                      >
                                                                        {
                                                                          randomNumber
                                                                        }
                                                                      </div>
                                                                    ) : (
                                                                      <div
                                                                        style={{
                                                                          width:
                                                                            "100%",
                                                                        }}
                                                                      >
                                                                        {
                                                                          dataApi?.giai4_2
                                                                        }
                                                                      </div>
                                                                    )}
                                                                  </div>

                                                                  <div id="giai4_3">
                                                                    {isShowThreeDot(
                                                                      "giai4_3"
                                                                    ) && (
                                                                      <img
                                                                        src="https://www.minhngoc.net.vn//template/2016/images/choxoso.gif"
                                                                        alt="Loading..."
                                                                      />
                                                                    )}
                                                                    {isShowNumberLoading(
                                                                      "giai4_3"
                                                                    ) ? (
                                                                      <div
                                                                        style={{
                                                                          width:
                                                                            "100%",
                                                                        }}
                                                                        id="random_number_loading"
                                                                      >
                                                                        {
                                                                          randomNumber
                                                                        }
                                                                      </div>
                                                                    ) : (
                                                                      <div
                                                                        style={{
                                                                          width:
                                                                            "100%",
                                                                        }}
                                                                      >
                                                                        {
                                                                          dataApi?.giai4_3
                                                                        }
                                                                      </div>
                                                                    )}
                                                                  </div>
                                                                  <div id="giai4_4">
                                                                    {isShowThreeDot(
                                                                      "giai4_4"
                                                                    ) && (
                                                                      <img
                                                                        src="https://www.minhngoc.net.vn//template/2016/images/choxoso.gif"
                                                                        alt="Loading..."
                                                                      />
                                                                    )}
                                                                    {isShowNumberLoading(
                                                                      "giai4_4"
                                                                    ) ? (
                                                                      <div
                                                                        style={{
                                                                          width:
                                                                            "100%",
                                                                        }}
                                                                        id="random_number_loading"
                                                                      >
                                                                        {
                                                                          randomNumber
                                                                        }
                                                                      </div>
                                                                    ) : (
                                                                      <div
                                                                        style={{
                                                                          width:
                                                                            "100%",
                                                                        }}
                                                                      >
                                                                        {
                                                                          dataApi?.giai4_4
                                                                        }
                                                                      </div>
                                                                    )}
                                                                  </div>
                                                                  <div id="giai4_5">
                                                                    {isShowThreeDot(
                                                                      "giai4_5"
                                                                    ) && (
                                                                      <img
                                                                        src="https://www.minhngoc.net.vn//template/2016/images/choxoso.gif"
                                                                        alt="Loading..."
                                                                      />
                                                                    )}
                                                                    {isShowNumberLoading(
                                                                      "giai4_5"
                                                                    ) ? (
                                                                      <div
                                                                        style={{
                                                                          width:
                                                                            "100%",
                                                                        }}
                                                                        id="random_number_loading"
                                                                      >
                                                                        {
                                                                          randomNumber
                                                                        }
                                                                      </div>
                                                                    ) : (
                                                                      <div
                                                                        style={{
                                                                          width:
                                                                            "100%",
                                                                        }}
                                                                      >
                                                                        {
                                                                          dataApi?.giai4_5
                                                                        }
                                                                      </div>
                                                                    )}
                                                                  </div>
                                                                  <div id="giai4_6">
                                                                    {isShowThreeDot(
                                                                      "giai4_6"
                                                                    ) && (
                                                                      <img
                                                                        src="https://www.minhngoc.net.vn//template/2016/images/choxoso.gif"
                                                                        alt="Loading..."
                                                                      />
                                                                    )}
                                                                    {isShowNumberLoading(
                                                                      "giai4_6"
                                                                    ) ? (
                                                                      <div
                                                                        style={{
                                                                          width:
                                                                            "100%",
                                                                        }}
                                                                        id="random_number_loading"
                                                                      >
                                                                        {
                                                                          randomNumber
                                                                        }
                                                                      </div>
                                                                    ) : (
                                                                      <div
                                                                        style={{
                                                                          width:
                                                                            "100%",
                                                                        }}
                                                                      >
                                                                        {
                                                                          dataApi?.giai4_6
                                                                        }
                                                                      </div>
                                                                    )}
                                                                  </div>
                                                                  <div id="giai4_7">
                                                                    {isShowThreeDot(
                                                                      "giai4_7"
                                                                    ) && (
                                                                      <img
                                                                        src="https://www.minhngoc.net.vn//template/2016/images/choxoso.gif"
                                                                        alt="Loading..."
                                                                      />
                                                                    )}
                                                                    {isShowNumberLoading(
                                                                      "giai4_7"
                                                                    ) ? (
                                                                      <div
                                                                        style={{
                                                                          width:
                                                                            "100%",
                                                                        }}
                                                                        id="random_number_loading"
                                                                      >
                                                                        {
                                                                          randomNumber
                                                                        }
                                                                      </div>
                                                                    ) : (
                                                                      <div
                                                                        style={{
                                                                          width:
                                                                            "100%",
                                                                        }}
                                                                      >
                                                                        {
                                                                          dataApi?.giai4_7
                                                                        }
                                                                      </div>
                                                                    )}
                                                                  </div>
                                                                </td>
                                                              </tr>
                                                              <tr>
                                                                <td className="giai5l">
                                                                  Giải năm
                                                                </td>
                                                                <td className="giai5">
                                                                  <div id="giai5">
                                                                    {isShowThreeDot(
                                                                      "giai5"
                                                                    ) && (
                                                                      <img
                                                                        src="https://www.minhngoc.net.vn//template/2016/images/choxoso.gif"
                                                                        alt="Loading..."
                                                                      />
                                                                    )}
                                                                    {isShowNumberLoading(
                                                                      "giai5"
                                                                    ) ? (
                                                                      <div
                                                                        style={{
                                                                          width:
                                                                            "100%",
                                                                        }}
                                                                        id="random_number_loading"
                                                                      >
                                                                        {
                                                                          randomNumber
                                                                        }
                                                                      </div>
                                                                    ) : (
                                                                      <div
                                                                        style={{
                                                                          width:
                                                                            "100%",
                                                                        }}
                                                                      >
                                                                        {
                                                                          dataApi?.giai5
                                                                        }
                                                                      </div>
                                                                    )}
                                                                  </div>
                                                                </td>
                                                              </tr>
                                                              <tr>
                                                                <td className="giai6l">
                                                                  Giải
                                                                  s&aacute;u
                                                                </td>
                                                                <td className="giai6">
                                                                  <div id="giai6_1">
                                                                    {isShowThreeDot(
                                                                      "giai6_1"
                                                                    ) && (
                                                                      <img
                                                                        src="https://www.minhngoc.net.vn//template/2016/images/choxoso.gif"
                                                                        alt="Loading..."
                                                                      />
                                                                    )}
                                                                    {isShowNumberLoading(
                                                                      "giai6_1"
                                                                    ) ? (
                                                                      <div
                                                                        style={{
                                                                          width:
                                                                            "100%",
                                                                        }}
                                                                        id="random_number_loading"
                                                                      >
                                                                        {
                                                                          randomNumber
                                                                        }
                                                                      </div>
                                                                    ) : (
                                                                      <div
                                                                        style={{
                                                                          width:
                                                                            "100%",
                                                                        }}
                                                                      >
                                                                        {
                                                                          dataApi?.giai6_1
                                                                        }
                                                                      </div>
                                                                    )}
                                                                  </div>
                                                                  <div id="giai6_2">
                                                                    {isShowThreeDot(
                                                                      "giai6_2"
                                                                    ) && (
                                                                      <img
                                                                        src="https://www.minhngoc.net.vn//template/2016/images/choxoso.gif"
                                                                        alt="Loading..."
                                                                      />
                                                                    )}
                                                                    {isShowNumberLoading(
                                                                      "giai6_2"
                                                                    ) ? (
                                                                      <div
                                                                        style={{
                                                                          width:
                                                                            "100%",
                                                                        }}
                                                                        id="random_number_loading"
                                                                      >
                                                                        {
                                                                          randomNumber
                                                                        }
                                                                      </div>
                                                                    ) : (
                                                                      <div
                                                                        style={{
                                                                          width:
                                                                            "100%",
                                                                        }}
                                                                      >
                                                                        {
                                                                          dataApi?.giai6_2
                                                                        }
                                                                      </div>
                                                                    )}
                                                                  </div>
                                                                  <div id="giai6_3">
                                                                    {isShowThreeDot(
                                                                      "giai6_3"
                                                                    ) && (
                                                                      <img
                                                                        src="https://www.minhngoc.net.vn//template/2016/images/choxoso.gif"
                                                                        alt="Loading..."
                                                                      />
                                                                    )}
                                                                    {isShowNumberLoading(
                                                                      "giai6_3"
                                                                    ) ? (
                                                                      <div
                                                                        style={{
                                                                          width:
                                                                            "100%",
                                                                        }}
                                                                        id="random_number_loading"
                                                                      >
                                                                        {
                                                                          randomNumber
                                                                        }
                                                                      </div>
                                                                    ) : (
                                                                      <div
                                                                        style={{
                                                                          width:
                                                                            "100%",
                                                                        }}
                                                                      >
                                                                        {
                                                                          dataApi?.giai6_3
                                                                        }
                                                                      </div>
                                                                    )}
                                                                  </div>
                                                                </td>
                                                              </tr>
                                                              <tr>
                                                                <td className="giai7l">
                                                                  Giải bảy
                                                                </td>
                                                                <td className="giai7">
                                                                  <div id="giai7">
                                                                    {isShowThreeDot(
                                                                      "giai7"
                                                                    ) && (
                                                                      <img
                                                                        src="https://www.minhngoc.net.vn//template/2016/images/choxoso.gif"
                                                                        alt="Loading..."
                                                                      />
                                                                    )}
                                                                    {isShowNumberLoading(
                                                                      "giai7"
                                                                    ) ? (
                                                                      <div
                                                                        style={{
                                                                          width:
                                                                            "100%",
                                                                        }}
                                                                        id="random_number_loading"
                                                                      >
                                                                        {
                                                                          randomNumber
                                                                        }
                                                                      </div>
                                                                    ) : (
                                                                      <div
                                                                        style={{
                                                                          width:
                                                                            "100%",
                                                                        }}
                                                                      >
                                                                        {
                                                                          dataApi?.giai7
                                                                        }
                                                                      </div>
                                                                    )}
                                                                  </div>
                                                                </td>
                                                              </tr>
                                                              <tr>
                                                                <td className="giai8l">
                                                                  Giải 8
                                                                </td>
                                                                <td className="giai8">
                                                                  <div id="giai8">
                                                                    {isShowThreeDot(
                                                                      "giai8"
                                                                    ) && (
                                                                      <img
                                                                        src="https://www.minhngoc.net.vn//template/2016/images/choxoso.gif"
                                                                        alt="Loading..."
                                                                      />
                                                                    )}
                                                                    {isShowNumberLoading(
                                                                      "giai8"
                                                                    ) ? (
                                                                      <div
                                                                        style={{
                                                                          width:
                                                                            "100%",
                                                                        }}
                                                                        id="random_number_loading"
                                                                      >
                                                                        {
                                                                          randomNumber
                                                                        }
                                                                      </div>
                                                                    ) : (
                                                                      <div
                                                                        style={{
                                                                          width:
                                                                            "100%",
                                                                        }}
                                                                      >
                                                                        {
                                                                          dataApi?.giai8
                                                                        }
                                                                      </div>
                                                                    )}
                                                                  </div>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </div>
                                                <div className="bottom">
                                                  <div className="bkl">
                                                    <div className="bkr">
                                                      <div className="bkm">
                                                        &nbsp;
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="bangkqxs_link">
                                                <table>
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        style={{
                                                          whiteSpace: "nowrap",
                                                        }}
                                                        valign="middle"
                                                      >
                                                        <a
                                                          href="https://www.minhngoc.net.vn//ve-so/mien-nam/soc-trang/05-02-2025.html"
                                                          target="_blank"
                                                          title="Mẫu vé kiểm tra khi đổi số trúng thưởng"
                                                        ></a>
                                                      </td>
                                                      <td
                                                        style={{
                                                          whiteSpace: "nowrap",
                                                        }}
                                                        valign="middle"
                                                      ></td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </div>
                                              <div className="clear"></div>
                                            </div>
                                          </div>
                                          <div>
                                            <img
                                              src="https://dienphuc.dienchau.nghean.gov.vn/uploads/news/2024_12/chuc-mung-nam-moi-2025.jpg"
                                              width="100%"
                                            />
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                              </td>
                              <td className="right">
                                <div>
                                  {" "}
                                  <img
                                    src="https://img.minhngoc.net/ads/tructiep-250x360.gif"
                                    alt="img-left"
                                    height="500"
                                    width="100%"
                                  />
                                </div>
                              </td>
                            </tr>
                          </table>
                        </div>
                        <div className="dnw-footer">
                          <div className="dnw-footer-l">
                            <div className="dnw-footer-r">
                              <div className="dnw-footer-body">
                                <table width="100%">
                                  <tr>
                                    <td>
                                      <div>
                                        <p>&nbsp;</p>
                                        <table style={{ width: "100%" }}>
                                          <tbody>
                                            <tr>
                                              <td
                                                height="50"
                                                style={{
                                                  textAlign: "center",
                                                }}
                                              >
                                                <p>
                                                  <span
                                                    style={{
                                                      color: "rgb(128,128,128)",
                                                    }}
                                                  >
                                                    <span>
                                                      <span
                                                        style={{
                                                          fontSize: "15px",
                                                        }}
                                                      >
                                                        <strong>
                                                          HỆ THỐNG ĐẠI L&Yacute;
                                                          PH&Acirc;N PHỐI
                                                        </strong>
                                                      </span>
                                                    </span>
                                                  </span>
                                                  <span
                                                    style={{
                                                      color: "#b22222",
                                                    }}
                                                  >
                                                    <span>
                                                      <span
                                                        style={{
                                                          fontSize: "15px",
                                                        }}
                                                      >
                                                        <strong>
                                                          XỔ SỐ MINH NGỌC
                                                        </strong>
                                                      </span>
                                                    </span>
                                                  </span>
                                                </p>
                                                <p>
                                                  <span
                                                    style={{
                                                      color: "rgb(128,128,128)",
                                                    }}
                                                  >
                                                    <span
                                                      onClick={() =>
                                                        toggleFormChangeResult()
                                                      }
                                                      id="toggle_form_thay_doi_ket_qua"
                                                    >
                                                      Trụ
                                                    </span>
                                                    sở: 119 Ng&ocirc; Tất
                                                    Tố,&nbsp;Phường 22, Quận
                                                    B&igrave;nh Thạnh, TP. HCM
                                                    <br />
                                                    &nbsp; Tel:{" "}
                                                    <span
                                                      style={{
                                                        fontSize: "14px",
                                                      }}
                                                    >
                                                      <strong>
                                                        028 6266 2222 - 090 363
                                                        7779
                                                      </strong>
                                                    </span>
                                                  </span>
                                                  <br />
                                                  <span
                                                    style={{
                                                      fontSize: "13px",
                                                    }}
                                                  >
                                                    <span
                                                      style={{
                                                        color: "#800000",
                                                      }}
                                                    >
                                                      <span
                                                        style={{
                                                          color: "#800000",
                                                        }}
                                                      >
                                                        <strong>
                                                          <span>
                                                            ĐỔI SỐ TR&Uacute;NG
                                                            ĐẶC BIỆT
                                                          </span>
                                                        </strong>
                                                      </span>
                                                    </span>
                                                    <strong>
                                                      <span
                                                        style={{
                                                          color: "#800000",
                                                        }}
                                                      >
                                                        &nbsp;Hotline:{" "}
                                                      </span>
                                                      <span
                                                        style={{
                                                          color: "#b22222",
                                                        }}
                                                      >
                                                        0973 777779
                                                      </span>
                                                    </strong>
                                                  </span>
                                                </p>
                                              </td>
                                              <td
                                                height="50"
                                                style={{
                                                  textAlign: "center",
                                                }}
                                              >
                                                <p>
                                                  <span
                                                    style={{
                                                      color: "rgb(128,128,128)",
                                                    }}
                                                  >
                                                    <span
                                                      style={{
                                                        fontSize: "13px",
                                                      }}
                                                    >
                                                      <strong>
                                                        C&Ocirc;NG TY TNHH MTV
                                                        ĐL XỔ SỐ MINH NGỌC
                                                      </strong>
                                                    </span>
                                                  </span>
                                                  <br />
                                                  <span
                                                    style={{
                                                      color: "rgb(128,128,128)",
                                                    }}
                                                  >
                                                    <span
                                                      style={{
                                                        fontSize: "14px",
                                                      }}
                                                    >
                                                      <strong></strong>
                                                    </span>
                                                    Minh Ngoc Lottery Agent
                                                    Company Limited
                                                  </span>
                                                </p>
                                                <p>
                                                  <span
                                                    style={{
                                                      color: "rgb(128,128,128)",
                                                    }}
                                                  >
                                                    MST: 0314553284 - Tel: +8428
                                                    6266 2222 - 0973777779
                                                    <br />
                                                    119 Ngo Tat To Street, 22
                                                    Ward, Binh Thanh Dist, HCM
                                                    City, Vietnam.
                                                  </span>
                                                </p>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                        <div style={{ textAlign: "center" }}>
                                          <a href="https://www.minhngoc.net.vn/thong-tin/dieu-khoan-su-dung.html">
                                            <br />
                                            Điều khoản sử dụng
                                          </a>{" "}
                                          | Li&ecirc;n
                                          hệ:&nbsp;info@minhngoc.net.vn |{" "}
                                          <a
                                            className="Xổ Số Minh Ngọc™"
                                            href="https://www.minhngoc.net.vn/"
                                            id="Xổ Số Minh Ngọc™"
                                            title="Xổ Số Minh Ngọc™"
                                            type="Xổ Số Minh
                                                      Ngọc™"
                                          >
                                            www.minhngoc.net.vn
                                          </a>
                                        </div>
                                        <div style={{ textAlign: "center" }}>
                                          Copyright &copy; 2006 - 2022 Minh
                                          Ngọc&trade; All right Reserved
                                          <br />
                                          &nbsp;
                                        </div>
                                        <div style={{ textAlign: "center" }}>
                                          Tag: xs | xo so | xo so minh ngoc | xs
                                          minh ngoc | minhngoc | xsminhngoc |
                                          kqxs minh ngoc | xsmn | minh ngoc net
                                          | minhngoc.net.vn | minh ngoc com |
                                          xosominhngoc
                                        </div>
                                        <div style={{ textAlign: "center" }}>
                                          &nbsp;
                                        </div>
                                        <div className="clear"></div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <div className="dailog_bog"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <style jsx>{`
        .dnw-content-layout .main div,
        .dnw-content-layout .main table {
          max-width: 520px;
        }
        .box_kqxs div img,
        .box_kqxs div.Menutool img,
        .box_kqxs td,
        .dnw-content-layout .box_kqxs td,
        .modulesLR .title-r,
        div.Menutool img,
        input,
        select,
        span.bol30,
        textarea {
          vertical-align: middle;
        }

        a {
          text-decoration: none;
        }

        .box_kqxs {
          font-size: 11px;
          margin: 0 auto;
        }

        .box_kqxs td div {
          font-family: Tahoma, Geneva, sans-serif;
        }

        .box_kqxs .title,
        .box_kqxs .title a,
        .box_kqxs .title td {
          text-align: center;
          color: #fff;
          font-size: 16px;
          vertical-align: middle;
          font-weight: 700;
          text-transform: uppercase;
        }

        .box_kqxs .top .iconrightkq a,
        ul.menu li a,
        ul.menu2 li a {
          font-family: Arial, Helvetica, sans-serif;
          text-decoration: none;
        }

        .box_kqxs .title a:hover {
          color: #ff0;
        }

        .box_kqxs .top .bkl {
          padding-left: 13px;
        }

        .box_kqxs .top .bkr {
          padding-right: 13px;
        }

        .box_kqxs .top .bkm {
          height: 40px;
          line-height: 30px;
        }

        .box_kqxs .top .icon {
          text-align: center;
          width: 20px;
          float: left;
        }

        .box_kqxs .top .title {
          text-align: left;
          float: left;
          padding-left: 10px;
          margin-top: 5px;
        }

        .box_kqxs .top .title a,
        .box_kqxs .top .title a:visited {
          color: #fff;
        }

        .box_kqxs .top .title a:hover {
          color: #ff0;
        }

        .box_kqxs .top .icon .icon_new {
          display: block;
          width: 20px;
          height: 20px;
          margin-top: 7px;
        }

        .box_kqxs .top .icon .icon_old {
          display: block;
          width: 20px;
          height: 20px;
          margin-top: 7px;
        }

        .box_kqxs .top .iconrightkq {
          float: right;
          margin-left: 5px;
          text-align: left;
          text-align: right;
          margin-top: 10px;
        }

        .box_kqx s .top .iconrightkq a {
          color: #f5f5f5;
          font-size: 11px;
          font-weight: 400;
        }

        .box_kqxs .top .iconrightkq a:hover {
          color: #ff0;
          text-decoration: none;
        }

        .box_kqxs .top .iconright {
          float: right;
          margin-left: 5px;
          width: 20px;
          text-align: right;
          margin-top: 10px;
        }

        .box_kqxs .top .iconright a.icontk {
          display: block;
          width: 25px;
          height: 14px;
        }

        .box_kqxs .bottom .bkl {
          padding-left: 13px;
        }

        .box_kqxs .bottom .bkr {
          padding-right: 13px;
        }

        .box_kqxs .bottom .bkm {
          height: 17px;
          line-height: 30px;
        }

        .box_kqxs a,
        .box_kqxs a:visited {
          color: #03c;
        }

        .box_kqxs .ngay a,
        .box_kqxs .ngay a:visited,
        .box_kqxs .tngay {
          color: #03c;
        }

        .box_kqxs .loading {
          background: url(/images/loading.gif) center no-repeat;
          height: 10px;
          min-width: 10px;
          display: block;
          margin: 2px 0;
        }

        .box_kqxs div img {
          margin: 0 0 0 1px;
          border: 0;
          max-height: 15px;
        }

        .box_kqxs .bkqmiennam .rightcl .giai8 div img,
        .box_kqxs .bkqtinhmienbac .giai7 div img,
        .box_kqxs .bkqtinhmienbac .giaidb div img {
          max-height: 20px;
        }

        .box_kqxs td.Menutool {
          border-right: 1px #999 solid;
          padding: 0;
          margin: 0;
        }

        .box_kqxs div.Menutool,
        div.Menutool {
          margin: 0 auto;
          clear: both;
          display: block;
          border: 1px solid #999;
          border-bottom: 0;
          border-top: 0;
          height: 25px;
          line-height: 25px;
        }

        .box_kqxs div.Menutool table,
        div.Menutool table {
          border: 0;
        }

        .box_kqxs div.Menutool table td,
        div.Menutool table td {
          padding: 0 10px;
          line-height: 24px;
          border: 0;
        }

        .box_kqxs div.Menutool img,
        div.Menutool img {
          margin: 0 5px;
        }

        .box_kqxs div.Menutool a,
        div.Menutool a {
          color: #000;
        }

        .box_kqxs div.Menutool a.sound,
        .box_kqxs div.Menutool a.sound.soundon,
        a.sound.soundon,
        div.Menutool a.sound,
        div.Menutool a.sound.soundon {
          padding-left: 30px;
        }

        .box_kqxs div.Menutool a.sound.soundoff,
        a.sound.soundoff,
        div.Menutool a.sound.soundoff {
          padding-left: 30px;
        }

        lable,
        li {
          margin: 0;
          padding: 0;
        }

        #kqxsh a,
        .hottitle,
        .red,
        fieldset legend,
        span.bol30 {
          font-weight: 700;
        }

        .datepick-rtl,
        .ui-datepicker-rtl {
          direction: rtl;
        }

        #lightbox-nav a,
        .ui-dialog,
        .ui-menu,
        input:focus {
          outline: 0;
        }

        fieldset {
          border-radius: 5px;
          border: 1px solid #efefef;
        }

        fieldset legend {
          background-color: #ccc;
          border-radius: 3px;
          padding: 3px 10px;
        }

        li {
          list-style: none;
        }

        a,
        a:visited {
          color: #39c;
        }

        lable {
          line-height: 100%;
        }

        #hinhxstt {
          text-align: center;
          height: 45px;
        }

        div.boxbinhchon {
          text-align: left;
        }

        div.boxbinhchon .bc_question {
          text-align: left;
          font-weight: 700;
        }

        div.box_msdove {
          border: 1px solid #e5e5e5;
          background-color: #f7f7f7;
          font-size: 14px;
          line-height: 1.5;
          border-radius: 3px;
          margin: 10px auto;
          padding: 5px;
        }

        div.ads_space {
          clear: both;
          display: block;
        }

        a.dvs_linkdoisotrung {
          line-height: 33px;
          display: block;
          text-align: center;
          color: #333;
          text-shadow: none;
          width: 200px;
          margin: 0 auto;
        }

        a.dvs_linkdoisotrung:hover {
          color: #fff;
        }

        .border td {
          color: #000;
        }

        .box_thongkexoso {
          border: 1px solid #e9e9e9;
          border-bottom: 3px solid #e9e9e9;
          border-radius: 5px;
          padding: 5px 1px 1px;
        }

        .box_thongkexoso h2.title_kqtk {
          border: 1px solid #666;
          border-radius: 4px 4px 0 0;
          margin-top: -4px;
          font-size: 11px;
          line-height: 20px;
          padding-left: 10px;
          margin-bottom: 1px;
          color: #fff;
        }

        .box_formthongkexoso {
          border: 1px solid #c75b00;
          border-bottom: 3px solid #c75b00;
          border-radius: 5px;
          background-color: #feffe5;
          padding: 5px 10px;
        }

        .box_formthongkexoso h3.slecttk {
          border: 1px solid #c75b00;
          border-radius: 5px 5px 0 0;
          font-size: 12px;
          line-height: 20px;
          color: #000;
          border-bottom: 2px solid #c75b00;
          margin: -6px -11px 1px;
          padding: 5px;
          background: #c75b00;
        }

        .box_thongkexosoext {
          border: 1px solid #e9e9e9;
          border-bottom: 3px solid #e9e9e9;
          border-radius: 5px;
          padding: 5px 10px;
        }

        .box_thongkexosoext h2.title_kqtkext {
          border: 1px solid #155283;
          border-radius: 5px 5px 0 0;
          font-size: 12px;
          line-height: 25px;
          padding-left: 10px;
          color: #fff;
          border-bottom: 2px solid #155283;
          margin: -6px -11px 1px;
        }

        div.box_tkdefault_loto {
          margin: 0 -8px -3px;
        }

        div.box_tkdefault_loto h4.box_tkdefault_title {
          line-height: 25px;
          padding-left: 10px;
          border: 1px solid #333;
          text-align: center;
          text-transform: uppercase;
          color: #fff;
          border-radius: 5px 5px 0 0;
        }

        div.box_tkdefault_loto table {
          border: 1px solid #333;
        }

        div.box_tkdefault_loto table td {
          border-bottom: 1px solid #ccc;
          text-align: center;
          padding: 2px;
        }

        div.box_tkdefault_loto table td.so,
        div.box_tkdefault_loto table tr.header td.so {
          background: #f5f5f5;
          width: 30px;
        }

        div.box_tkdefault_loto table tr.header td {
          background: #ccc;
          height: 20px;
          line-height: 20px;
        }

        .box_tkdefault_xhn3l td,
        span.bol30 {
          line-height: 30px;
        }

        span.bol30 {
          background-repeat: no-repeat;
          font-size: 16px;
          height: 32px;
          width: 30px;
          display: inline-block;
          border: 0;
          position: static;
          text-align: center;
          color: #000;
        }

        span.bol30_0 {
          background-position: left 0;
        }

        span.bol30_1 {
          background-position: left -32px;
        }

        span.bol30_2 {
          background-position: left -64px;
        }

        span.bol30_3 {
          background-position: left -97px;
        }

        span.bol30_4 {
          background-position: left -130px;
        }

        span.bol30_5 {
          background-position: left -162px;
        }

        span.bol30_6 {
          background-position: left -194px;
        }

        span.bol30_7 {
          background-position: left -226px;
        }

        span.bol30_8 {
          background-position: left -259px;
        }

        span.bol30_9 {
          background-position: left -291px;
        }

        .box_tkdefault_xhn3l .box_tkdefault_title {
          border-bottom: 1px solid #e9e9e9;
          font-size: 12px;
        }

        #moduleslider-size,
        #rokslide-toolbar {
          background-color: #f2f2f2;
          text-align: left;
        }

        #moduleslider-size {
          height: 180px;
          overflow: hidden;
          margin-top: 0;
          margin-bottom: 5px;
          width: 570px;
        }

        .hottitle {
          color: #fff;
          font-size: 14px;
          line-height: 28px;
          padding-left: 10px;
        }

        #hottoday {
          font-size: 10px;
          border-radius: 5px;
          overflow: hidden;
          position: relative;
        }

        #hottoday td {
          white-space: nowrap;
        }

        #hottoday .norightborder {
          border-right: 0;
        }

        .red {
          color: red;
        }

        .onidprocess {
          position: absolute;
          z-index: 100;
          width: 70px;
          height: 60px;
          border-radius: 35px;
          line-height: 70px;
          text-align: center;
          left: 50%;
          top: 50%;
          padding-top: 10px;
          margin-left: -35px;
          margin-top: -35px;
          background: #fff;
          border: 1px solid #ccc;
          opacity: 0.8;
        }

        #hottoday .btnnext,
        #hottoday .btnprev {
          position: absolute;
          z-index: 2;
          width: 20px;
          height: 100%;
          text-indent: -9999em;
          overflow: hi dden;
        }

        #hottoday .btnprev {
          left: 0;
          margin-top: 0;
        }

        #hottoday .btnnext {
          right: 0;
        }

        .modulesLR .title-r h1,
        .modulesLR .title-r h1 a {
          color: #fff;
          font-size: 12px;
          text-align: left;
          font-weight: 700;
        }

        #tab_xstt a {
          padding-top: 8px;
        }

        div.component_max {
          border: 1px solid #eee;
          border-radius: 5px;
          overflow: hidden;
          padding: 5px;
        }

        .modulesLR {
          display: block;
          border: 1px solid #eee;
          border-radius: 5px;
          background: #f9f9f9;
          margin: 0;
          padding: 5px 0;
        }

        .modulesLR .title-l,
        .modulesLR .title-l_red {
          border-radius: 5px 5px 0 0;
          margin: -5px -1px 0;
        }

        .modulesLR .title-r h1 {
          padding: 5px 10px;
        }

        .modulesLR .body-r {
          text-align: center;
          padding: 5px 3px;
        }

        #dnw_right .modulesLR .body-r img {
          max-width: 240px;
          height: auto;
        }

        #component {
          display: block;
          border: 1px solid #eee;
          border-radius: 5px;
          overflow: hidden;
          margin: 0;
          padding: 5px 0;
        }

        #component .title-r h1 {
          color: #284974;
          font-size: 15px;
          font-weight: 700;
          padding: 3px 0 7px 60px;
        }

        #component .title-r h1 a {
          color: #000;
          font-size: 15px;
          font-weight: 700;
        }

        ul.menu li a,
        ul.menu2 li a {
          font-size: 11px;
          color: #333;
          display: block;
          font-weight: 700;
          white-space: nowrap;
        }

        #component .body-r {
          padding: 12px;
        }

        ul.menu li a {
          padding: 3px 0 3px 10px;
        }

        ul.menu li a:hover {
          background-color: #c4e1ff;
        }

        ul.menu2 li a {
          padding: 3px 0;
        }

        ul.menu2 li a:hover {
          color: #4a4a4a;
          background: #c4e1ff;
        }

        #loginForm span,
        #msgbox,
        #topmenu_mien_home li a {
          text-align: center;
          display: block;
        }

        .LR-box {
          border: 2px solid #7aae2e;
          border-radius: 5px;
          padding: 5px;
        }

        .LR-box h2.title {
          border-radius: 4px;
          font-size: 12px;
          color: #fff;
          line-height: 12px;
          margin: -6px -5px 5px;
          padding: 8px 0 8px 5px;
        }

        #loginForm td {
          padding: 0 2px;
        }

        #loginForm fieldset {
          display: block;
          border: 0;
          margin: 0 0 12px;
          padding: 0;
        }

        fieldset#body {
          background: #fff;
          border-radius: 3px;
          margin: 5px;
          padding: 10px 13px;
        }

        #loginForm #checkbox {
          width: auto;
          float: left;
          border: 0;
          margin-top: 5px;
          padding: 0;
        }

        #loginForm input {
          border: 1px solid #899caa;
          border-radius: 3px;
          color: #3a454d;
          box-shadow: inset 0 1px 3px #bbb;
          font-size: 12px;
          padding: 1px 5px;
        }

        #loginForm #login {
          width: auto;
          float: left;
          color: #fff;
          text-shadow: 0 -1px #278db8;
          border: 1px solid #339cdf;
          box-shadow: none;
          cursor: pointer;
          padding: 1px 5px;
        }

        #loginForm span {
          padding: 7px 0 4px;
        }

        #loginForm span a {
          color: #3a454d;
          text-shadow: 1px 1px #fff;
          font-size: 12px;
        }

        #msgbox {
          color: red;
          clear: both;
        }

        .topmenu {
          display: block;
          clear: both;
          position: a bsolute;
          bottom: -1px;
        }

        #topmenu_mien_home {
          position: relative;
          margin: 0 auto 0 324px;
          padding: 0;
        }

        #topmenu_mien_home li {
          float: left;
          display: block;
          border: 1px solid #ccc;
          border-bottom: 0;
          border-radius: 5px 5px 0 0;
          overflow: hidden;
          margin: 0 1px;
          padding: 0;
        }

        #topmenu_mien_home li a:hover {
          text-shadow: 1px 1px #000;
          color: #fff;
        }

        #topmenu_mien_home li a {
          color: #445058;
          line-height: 25px;
          font-weight: 700;
          text-shadow: 1px 1px #fff;
          float: left;
          padding: 2px 0;
        }

        #topmenu_mien_home li a.home {
          width: 60px;
        }

        .topnavbar {
          border-bottom: 1px solid #ccc;
        }

        #slider li,
        #slider ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        #slider li {
          width: 696px;
          height: 241px;
          overflow: hidden;
        }

        #nextBtn,
        #prevBtn {
          display: block;
          width: 30px;
          height: 77px;
          position: absolute;
          left: -30px;
          top: 71px;
        }

        #nextBtn {
          left: 696px;
        }

        #nextBtn a,
        #prevBtn a {
          display: block;
          width: 30px;
          height: 77px;
        }

        #dnw-main,
        .ddsmoothmenu ul li,
        .dnw-footer,
        .dnw-sheet,
        .dnw-sheet-body,
        div.dnw_header {
          position: relative;
        }

        .info_slide * {
          font-family: Consolas, arial, tahoma !important;
        }

        #dnw-main,
        #topmenu_mien_home li a,
        .dnw-sheet-body,
        .info_slide *,
        .sodauduoi_miennam .kq,
        input,
        select,
        table td,
        textarea {
          font-family: Arial, Helvetica, sans-serif;
        }

        div.clear {
          height: 10px;
          clear: both;
          overflow: hid den;
          text-indent: -999px;
        }

        #dnw-main,
        table td {
          font-size: 12px;
          line-height: 1.5;
        }

        a,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        ol,
        p,
        ul {
          margin: 0;
        }

        h1 {
          font-size: 24px;
        }

        h2 {
          font-size: 20px;
        }

        h3 {
          font-size: 18px;
        }

        h4 {
          font-size: 16px;
        }

        h6 {
          font-size: 12px;
        }

        input,
        select,
        textarea {
          font-size: 11px;
        }

        #dnw-main {
          z-index: 1;
          width: 100%;
          left: 0;
          top: 0;
          cursor: default;
        }

        body {
          color: #322c20;
          background: #fff;
          margin: 0 !important;
          padding: 0;
        }

        .cleared {
          float: none;
          clear: both;
          border: none;
          font-size: 1px;
          margin: 0;
          padding: 0;
        }

        form {
          margin: 0 !important;
          padding: 0 !important;
        }

        .dnw-sheet {
          min-width: 1040px;
          cursor: auto;
          width: 1040px;
          text-align: left;
          margin: 0 auto;
          padding: 0 5px;
        }

        .dnw-sheet-body {
          margin: 0;
          padding: 0;
        }

        div.dnw_header {
          margin: 0 auto;
        }

        div.h_banner {
          display: block;
          height: 110px;
          padding: 0;
        }

        div.logo {
          float: left;
          margin-top: 5px;
          width: 320px;
        }

        div.dnw-nav {
          margin-bottom: 5px;
        }

        div.dnw-nav .dnw-nav-r {
          margin: 0 10px;
        }

        .dnw-content-layout {
          display: table;
          position: relative;
          table-layout: fixed;
          border-collapse: col lapse;
          border: none !important;
          width: 100%;
          margin: 0;
          padding: 5px 0;
        }

        #dnw-left {
          width: 200px;
          overflow: hidden;
        }

        .dnw-content-layout .left {
          width: 300px;
          padding-right: 10px;
        }

        .dnw-content-layout .right {
          padding-left: 10px;
        }

        .dnw-content-layout .right,
        .sidebar-roller {
          width: 300px;
        }

        .dnw-content-layout td {
          vertical-align: top;
        }

        #news-list-item {
          border-bottom: 1px solid #ccc;
          display: inline-block;
          width: 100%;
          margin: 5px;
        }

        #news-list-item .news-list-item-body {
          text-align: left;
          padding: 2px;
        }

        #news-list-item .news-list-item-image {
          text-align: center;
          overflow: hidden;
          width: inherit;
          float: left;
          display: inline-ta ble;
          border: 1px solid #ccc;
          background: #fff;
          margin: 5px 5px 5px 0;
          padding: 2px;
        }

        .news-list-item-title,
        .news-list-item-title a {
          color: #c00;
          font-weight: 700;
        }

        .news-list-item-desc {
          font-size: 11px;
          font-style: italic;
        }

        li.news-list-it em-title {
          margin-left: 25px;
          padding: 0;
        }

        li.news-list-item-title a {
          color: #c00;
          font-style: italic;
          text-decoration: none;
          font-weight: 400;
        }

        li.news-list-item-title a:hover {
          color: #06f;
        }

        #news-list-item .btnchitiet {
          width: 70px;
          height: 20px;
          float: right;
          display: inline-block;
          margin: 2px;
        }

        .btnchitiet,
        .btnlienhe {
          width: 67px;
          height: 21px;
          display: inline-block;
        }

        div.dnw-content-top {
          z-index: 50;
        }

        div.dnw-content-main {
          margin-top: 5px;
        }

        .btnchitiet {
          margin: 2px;
        }

        .btnlienhe {
          margin: 2px;
        }

        .btnlienhe_details {
          width: 150px;
          height: 30px;
          display: none;
          margin: 2px;
        }

        .btndatmua {
          width: 89px;
          height: 36px;
          display: inline-block;
          margin: 2px;
        }

        #phantrang {
          display: inline-table;
          margin-left: -50%;
          clear: both;
          height: 25px;
        }

        #p hantrang ul {
          width: inherit;
          float: right;
          margin: 0;
          padding: 0;
        }

        #phantrang ul li {
          display: block;
          width: inherit;
          background-color: #fff;
          float: left;
          text-decoration: none;
          list-style: n one;
          margin: 2px;
        }

        #phantrang ul li a {
          display: block;
          text-decoration: none;
          border: 1px solid #ccc;
          min-width: 12px;
          text-align: center;
          color: #333;
          font-weight: 700;
          padding: 0 2px;
        }

        #phantrang ul li a.active,
        #phantrang ul li a:hover {
          color: red;
          border-color: red;
        }

        #flashtop {
          height: 242px;
          margin: 0;
          padding: 0;
        }

        h1.pagetitle {
          text-transform: uppercase;
          size: 24px;
          font-size: 24 px;
          text-align: center;
        }

        .dnw-footer {
          margin-bottom: 0;
          overflow: hidden;
          background: #fff;
          color: #666;
          border-top: 1px solid #ccc;
          padding: 10px 20px 0;
        }

        .baivietcungnhom ul,
        lable *,
        ul,
        ul.content_list,
        ul.forum_new_post,
        ul.tab_thu {
          margin: 0;
          padding: 0;
        }

        #hottoday .hottoday_mien:hover,
        #hottoday .hottoday_tinh25:hover,
        .border td a:hover,
        a:hover,
        ul.list_news li a:hover,
        ul.tab_thu li a span:hover {
          color: red;
        }

        .border td a,
        .box_tkdefault_xhn3l .box_tkdefault_title a {
          color: #000;
        }

        .box_tkdefault_xhn3l .chiso,
        ul.menumember {
          margin-top: 10px;
        }

        #box_tracuukqxs input,
        #box_tracuukqxs select,
        #box_tracuukqxs td,
        #hottoday * {
          font-size: 11px;
        }

        #hottoday .icon,
        ul.menu .icon,
        ul.menu2 .icon {
          display: block;
        }

        ul.menu,
        ul.menu2 {
          text-align: left;
          margin: 0 2px;
        }

        ul.menu ul,
        ul.menu2 ul {
          margin: 0 0 -1px;
          padding: 0;
        }

        ul.menu ul li,
        ul.menu2 ul li {
          list-style: none;
          margin-top: -1px;
        }

        ul.menu li ul li a,
        ul.menu2 li ul li a {
          text-decoration: none;
          font-size: 11px;
          color: #333;
          display: block;
          font-weight: 400;
          white-space: n owrap;
          padding: 3px 0;
        }

        #frminkq input,
        #frminkq select,
        h5 {
          font-size: 14px;
        }

        #loginForm a,
        ul.list_binnhchon li a {
          font-weight: 700;
        }

        #noidung,
        .box_skitter .image {
          overflow: hidden;
        }

        .btndathang,
        .btndathang_details {
          width: 67px;
          height: 21px;
          display: inlin e-block;
          margin: 2px;
        }

        .ddsmoothmenu {
          height: 28px;
          font-size: 12px;
          padding: 5px 0;
        }

        .ddsmoothmenu ul {
          z-index: 2000;
          list-style-type: none;
          margin: 0;
          padding: 0;
        }

        .ddsmoothmenu ul li {
          display: inline;
          float: left;
          margin: 0;
          padding: 0;
        }

        .ddsmoothmenu ul li a {
          display: block;
          color: #333;
          text-decoration: none;
          text-transform: uppercase;
          font-weight: 700;
          background-repeat: no-repeat;
          background-position: left center;
          margin: 0;
          padding: 7px 16px 5px;
        }

        .ddsmoothmenu ul li ul li a span {
          padding-left: 10px;
        }

        .ddsmoothmenu ul li ul li {
          margin-bottom: -1px;
          display: list-item;
          float: none;
          position: inherit;
        }

        .ddsmoothmenu ul li ul li a {
          display: block;
          text-decoration: none;
          font-weight: 700;
          background: 0 0;
          height: 25px;
          line-height: 25px;
          border-bottom: 1px solid #f6f6c9;
          border-top: 1px solid #f6f6c9;
          margin: 0;
          padding: 0 5px;
        }

        .ddsmoothmenu ul li a.no-sepa {
          background-image: none;
        }

        * html .ddsmoothmenu ul li a {
          display: inline-block;
        }

        .ddsmoothmenu ul li a:link,
        .ddsmoothmenu ul li a:visited {
          color: #fff;
          white-space: nowrap;
        }

        .ddsmoothmenu ul li ul li a:link,
        .ddsmoothmenu ul li ul li a:visited {
          color: #333;
          text-transform: none;
          white-space: nowrap;
        }

        .ddsmoothmenu ul li ul li a:hover {
          color: #ec0000;
          text-transform: none;
          white-space: nowrap;
        }

        .ddsmoothmenu ul li ul li a.selected {
          background-color: #feffe5;
          background-image: none;
          color: #ec0000;
          padding-bottom: 0;
        }

        .ddsmoothmenu ul li ul li a.selected:hover {
          padding-bottom: 0;
        }

        .ddsmoothmenu ul li a:hover {
          background-color: #feffe5;
          background-image: none;
          color: #333;
          border-radius: 5px;
        }

        .ddsmoothmenu ul li a.no-child-menu:hover {
          color: #333;
          background-color: transparent;
        }

        .ddsmoothmenu ul li ul {
          position: absolute;
          left: 0;
          display: none;
          visibility: hidden;
        }

        .ddsmoothmenu ul li ul.submenu-border {
          background-color: #feffe5;
          border-radius: 0 0 5px 5px;
          padding: 5px 0;
          border: 1px solid #ccc;
          border-top: 0;
          margin-top: 3px;
        }

        .ddsmoothmenu ul li ul li ul.submenu-border {
          background-color: #feffe5;
          border-radius: 0 0 5px 5px;
          margin-left: -5px;
          top: 0;
          position: absolute;
          padding: 5px 0;
          margin-top: 0;
        }

        ul#menukqxstinh.submenu-border {
          width: 480px;
        }

        ul#menukqxstinh.submenu-b order div.submenu-border {
          width: 100%;
        }

        ul#menukqxstinh.submenu-border li {
          width: 33%;
          float: left;
        }

        ul#menukqxstinh.submenu-border li.root {
          width: auto;
          display: block;
          float: none;
          text-align: center;
          clear: both;
          background: #f0d88e;
          padding: 0;
        }

        ul#menukqxstinh.submenu-border li.root a:hover {
          background: #f0d88e;
        }

        ul#menukqxstinh.submenu-border li.root a span {
          background: 0 0;
        }

        .ddsmoothmenu ul li ul li ul {
          top: 0;
        }

        .ddsmoothmenu ul li ul li a.top-menu-popup-a {
          color: #333;
          border: none;
          border-top: dotted 1px #ccc;
          padding-left: 10px;
          font-weight: 400;
          text-transform: none;
          background-image: none;
        }

        .ddsmo othmenu ul li ul li a.top-menu-popup-a:hover {
          background-color: #f2f2f2;
        }

        * html .ddsmoothmenu {
          height: 1%;
        }

        .downarrowclass {
          position: absolute;
          top: 12px;
          right: 7px;
        }

        .rightarrow class {
          position: absolute;
          top: 6px;
          right: 5px;
        }

        #jquery-lightbox,
        #jquery-overlay,
        #lightbox-nav,
        .dds hadow {
          position: absolute;
          top: 0;
          left: 0;
        }

        .ddshadow {
          width: 0;
          height: 0;
          background: silver;
        }

        .toplevels hadow {
          opacity: 0.8;
        }

        span.top-menu-popup-span {
          color: #c00d0e;
          display: block;
          font-size: 14px;
          font-weight: 700;
          padding-bottom: 10px;
          padding-top: 10px;
          text-transform: uppercase;
        }

        .top-menu-p opup {
          min-width: 170px;
        }

        .top-menu-popup ul li a {
          font-weight: 400 !important;
        }

        .ddsmoothmenu ul li ul li.child a {
          font-weight: 400;
          padding-left: 5px;
        }

        .ddsmoothmenu ul li ul li.child a span {
          padding-left: 15px;
        }

        .ddsmoothmenu ul li a.selected,
        .ddsmoothmenu ul li a.selected:hover {
          background-color: #feffe5;
          background-image: none;
          color: #333;
          padding-bottom: 10px;
          border-radius: 5px 5px 0 0;
        }

        #hottoday {
          border: 1px solid #9e9e9e;
        }

        #hottoday .border {
          border: none;
        }

        body {
          font: 11px Arial, Helvetica, sans-serif;
        }

        div.banner_ads,
        div.header_ext {
          position: relative;
          float: left;
          overflow: hi dden;
        }

        ul.menu li a.hottoday_mien,
        ul.menu2 li a.hottoday_tinh7 {
          font-weight: 400;
        }

        .bkqtinhmiennam .giai4 div:nth-child(n + 5) {
          width: 33.33%;
        }

        #hottoday .hottoday_mien,
        #hottoday .hottoday_tinh25 {
          color: #000;
          text-align: right;
        }

        #hottoday table td:hover {
          color: #4a4a4a;
          background-color: #c4e1ff;
        }

        .modulesLR.moduleBrown {
          background: #f3f3f3;
          border: 1px solid #9e9e9e;
        }

        .modulesLR.moduleBrown .body-r {
          text-align: left;
          padding: 0 3px;
        }

        .ui-button,
        .ui-datepicker th,
        .ui-state-default,
        .ui-widget-content .ui-state-default,
        .ui-widget-header .ui-state-default {
          text-align: center;
        }

        .modulesLR.moduleBrown .title-l {
          background: #eee;
          color: #000;
          border: 1px solid #9e9e9e;
          border-top: 0;
        }

        .modulesLR.moduleBrown:hover {
          border: 1px solid #757575;
        }

        .modulesLR.moduleBrown:hover .title-l {
          border: 1px solid #757575;
          border-top: 0;
          background: #e0e0e0;
        }

        .modulesLR.moduleBrown .title-l:hover,
        .modulesLR.moduleBrown .title-l:visited {
          background: #e0e0e0;
        }

        .modulesLR.moduleBrown .title-r h1,
        .modulesLR.moduleBrown .title-r h1 a {
          color: #000;
        }

        .modulesLR.moduleBrown.moduleWhite {
          background: #fff;
        }

        #topmenu_mien_hom e li a {
          font-size: 13px;
          width: 82px;
        }

        #tab_xstt a {
          height: 18px;
          min-width: 110px;
          width: initial;
          padding: 8px 5px 5px;
          font-size: 12px;
          font-weight: 700;
          display: inline-block;
          margin: 0;
          border: 1px solid #ccc;
          border-bottom: 0;
          border-radius: 5px 5px 0 0;
          color: #322c20;
        }

        .bkqmiennam .rightcl .giai1 div,
        .bkqmiennam .rightcl .giai2 div,
        .bkqmiennam .rightcl .giai3 div,
        .bkqmiennam .rightcl .giai4 div,
        .bkqmiennam .rightcl .giai6 div,
        .bkqmiennam .rightcl .giai7 div,
        .bkqmiennam .rightcl .giai8 div,
        .bkqmiennam .rightcl .giaidb div,
        div.banner_ads {
          display: block;
        }

        #tab_xstt ._active,
        #tab_xstt a:hover {
          color: #fff;
        }

        div.banner_ads {
          width: 405px;
          height: 70px;
          margin: 5px;
        }

        div.header_ext {
          margin-top: 5px;
          height: 100px;
          width: 305px;
        }

        #topmenu_mien_home li.limientrung a {
          width: 90px;
        }

        #topmenu_mien_home li.mienbacdientoan a {
          width: 158px;
        }

        #hottoday .running,
        ul.menu.menu .running,
        ul.menu2 .running {
          background-size: 30px 8px;
        }

        .bkqmiennam {
          border: 1px solid #999;
          background-color: #fff;
          border-right: 0;
          border-bottom: 0;
          size: 11px;
          width: 100%;
        }

        .bkqmien nam div img {
          margin: 3px 0;
        }

        .bkqmiennam .leftcl td {
          border: 1px solid #999;
          border-top: 0;
          border-left: 0;
          text-align: center;
          height: 24px;
          padding: 0;
        }

        .bkqmiennam .ccgt {
          width: 123px;
        }

        .bkqmiennam .ccgt .rightcl .giai1,
        .bkqmiennam .ccgt .rightcl .giai2,
        .bkqmiennam .ccgt .rightcl .giai3,
        .bkqmiennam .ccgt .rightcl .giai4,
        .bkqmiennam .ccgt .rightcl .giai5,
        .bkqmiennam .ccgt .rightcl .giai6,
        .bkqmiennam .ccgt .rightcl .giai7,
        .bkqmiennam .ccgt .rightcl .giai8,
        .bkqmiennam .ccgt .rightcl .giaidb {
          font-size: 14px;
          color: #000;
          text-align: right;
          padding-right: 10px;
        }

        .bkqmiennam .rightcl td {
          border: 1px solid #999;
          border-top: 0;
          border-left: 0;
          text-align: center;
          height: 24px;
          padding: 0;
          vertical-align: middle;
        }

        .bkqmiennam .leftcl .thu {
          height: 24px;
          font-weight: 700;
          font-size: 13px;
        }

        .bkqmiennam .leftcl .ngay {
          height: 24px;
          font-weight: 700;
          font-size: 13px;
          background-color: #f3f3f3;
        }

        .bkqmiennam .leftcl .ngay a,
        .bkqmiennam .leftcl .ngay a:visited {
          color: #000;
        }

        .bkqmiennam .rightcl .tinh {
          height: 24px;
          font-weight: 700;
          font-size: 13px;
        }

        .bkqmiennam .rightcl .matinh {
          height: 24px;
          font-weight: 700;
          font-size: 13px;
          background-color: #f3f3f3;
        }

        .bkqmienna m .leftcl .giai8 {
          height: 36px;
          font-size: 13px;
        }

        .bkqmiennam .rightcl .giai8 {
          height: 36px;
          font-weight: 700;
          color: maroon;
          font-size: 24px;
          line-height: 100%;
        }

        .bkqmienna m .leftcl .giai7 {
          height: 25px;
          font-size: 13px;
          background-color: #f3f3f3;
        }

        .bkqmiennam .rightcl .giai7 {
          height: 25px;
          font-size: 16px;
          font-weight: 700;
          background-color: #f3f3f3;
        }

        .bkqmiennam .leftcl .giai6 {
          height: 66px;
          font-size: 13px;
        }

        .bkqmiennam .rightcl .giai6 {
          height: 66px;
          font-size: 16px;
          font-weight: 700;
          line-height: 130%;
        }

        .bkqmiennam .rightcl .giai6 div {
          height: 16px;
          padding: 0;
          margin: 3px 0;
        }

        .bkqmiennam .leftcl .giai5 {
          height: 25px;
          font-size: 13px;
          background-color: #f3f3f3;
        }

        .bkqmiennam .rightcl .giai5 {
          height: 25px;
          font-size: 16px;
          font-weight: 700;
          background-color: #f3f3f3;
        }

        .bkqmiennam .rightcl .giai5 div {
          display: block;
        }

        .bkqmiennam .leftcl .giai4 {
          height: 154px;
          font-size: 13px;
        }

        .bkqmiennam .rightcl .giai4 {
          height: 154px;
          font-size: 16px;
          font-weight: 700;
          line-height: 130%;
        }

        .bkqmiennam .rightcl .giai4 div {
          height: 16px;
          padding: 0;
          margin: 4px 0;
          clear: both;
        }

        .bkqmiennam .leftcl .giai3 {
          height: 45px;
          font-size: 13px;
          background-color: #f3f3f3;
        }

        .bkqmiennam .rightcl .giai3 {
          height: 45px;
          font-size: 16px;
          font-weight: 700;
          line-height: 130%;
          background-color: #f3f3f3 3;
        }

        .bkqmiennam .rightcl .giai3 div {
          height: 16px;
          padding: 0;
          margin: 2px 0;
        }

        .bkqmiennam .leftcl .giai2 {
          height: 25px;
          font-size: 13px;
        }

        .bkqmiennam .rightcl .giai2 {
          height: 25px;
          font-size: 16px;
          font-weight: 700;
        }

        .bkqmiennam .leftcl .giai1 {
          height: 25px;
          font-size: 13px;
          background-color: #f3f3f3;
        }

        .bkqmiennam .rightcl .giai1 {
          height: 25px;
          font-size: 16px;
          font-weight: 700;
          background-color: #f3f3f3;
        }

        .bkqmiennam .leftcl .giaidb {
          height: 34px;
          font-size: 13px;
        }

        .leftcl .giaidb a {
          color: #000;
        }

        .bkqmiennam .rightcl .giaidb {
          height: 34px;
          font-weight: 700;
          color: maroon;
          font-size: 18px;
        }

        .bkqmiennam .rightcl .giaidb a {
          color: maroon;
        }

        .bkqmienbac {
          border: 1px double #999;
          background: #fff;
          border-right: 0;
          border-bottom: 0;
          size: 11px;
          width: 100%;
        }

        .bkqmienbac .title {
          height: 35px;
          text-align: left;
          color: #fff;
          font-size: 16px;
          vertical-align: middle;
          font-weight: 700;
          padding-left: 25px;
        }

        .bkqmienba c .leftcl td,
        .bkqmienbac .rightcl td {
          border: 1px double #999;
          border-top: 0;
          border-left: 0;
          text-align: center;
          height: 24px;
          padding: 1px;
        }

        .bkqmienbac .thu {
          border: 1px double #999;
          border-top: 0;
          border-left: 0;
          height: 30px;
          font-weight: 700;
          font-size: 13px;
          text-align: center;
        }

        .bkqmienbac .ngay {
          border: 1px double #999;
          border-top: 0;
          border-left: 0;
          height: 30px;
          text-align: left;
          padding-left: 20px;
          font-weight: 700;
          font-size: 13px;
        }

        .bkqmienbac .rightcl .matinh,
        .bkqmienbac .rightcl .tinh {
          height: 24px;
          font-size: 13px;
          font-weight: 700;
        }

        .bkqmienbac .phathanh {
          float: right;
        }

        .bkqmienbac .rightcl .matinh {
          background-color: #f3f3f3;
        }

        .bkqmienbac .leftcl .giai8 {
          height: 36px;
          font-size: 13px;
        }

        .bkqmienbac .rightcl .giai8 {
          height: 36px;
          font-weight: 700;
          color: #903;
          font-size: 24px;
        }

        .bkqmienbac .leftcl .giai7 {
          height: 24px;
          font-size: 13px;
          background-color: #f3f3f3;
        }

        .bkqmienbac .rightcl .giai7 {
          height: 24px;
          font-size: 18px;
          font-weight: 700;
          background-color: #f3f3f3;
          color: maroon;
        }

        .bkqmienbac .leftcl .giai6 {
          height: 24px;
          font-size: 13px;
        }

        .bkqmienbac .rightcl .giai6 {
          height: 24px;
          font-size: 16px;
          font-weight: 700;
          line-height: 130%;
        }

        .bkqmienbac .leftcl .giai5 {
          height: 66px;
          font-size: 13px;
          background-color: #f3f3f3;
        }

        .bkqmienbac .rightcl .giai5 {
          height: 66px;
          font-size: 16px;
          font-weight: 700;
          background-color: #f3f3f3;
          line-height: 130%;
        }

        .bkqmienbac .leftcl .giai4 {
          height: 66px;
          font-size: 13px;
        }

        .bkqmienbac .rightcl .giai4 {
          height: 66px;
          font-size: 16px;
          font-weight: 700;
          line-height: 130%;
        }

        .bkqmienbac .leftcl .giai3 {
          height: 66px;
          font-size: 13px;
          background-color: #f3f3f3;
        }

        .bkqmienbac .rightcl .giai3 {
          height: 66px;
          font-size: 16px;
          font-weight: 700;
          line-height: 130%;
          background-color: #f3f3f3 3;
        }

        .bkqmienbac .leftcl .giai2 {
          height: 24px;
          font-size: 13px;
        }

        .bkqmienbac .rightcl .giai2 {
          height: 24px;
          font-size: 16px;
          font-weight: 700;
        }

        .bkqmienbac .leftcl .giai1 {
          height: 24px;
          font-size: 13px;
          background-color: #f3f3f3;
        }

        .bkqmienbac .rightcl .giai1 {
          height: 24px;
          font-size: 16px;
          font-weight: 700;
          background-color: #f3f3f3;
        }

        .bkqmienbac .leftcl .giaidb {
          height: 34px;
          font-size: 13px;
        }

        .bkqmienbac .rightcl .giaidb {
          height: 34px;
          font-weight: 700;
          color: maroon;
          font-size: 22px;
        }

        .bkqtinhmiennam .ngay,
        .bkqtinhmiennam .thu {
          color: #03c;
          font-weight: 700;
          background-color: #f3f3f3;
        }

        .bkqtinhmiennam {
          border: 1px solid #999;
          border-right: 0;
          border-bottom: 0;
          size: 11px;
          width: 100%;
        }

        .bkqtinhmiennam td {
          border: 1px solid #999;
          border-top: 0;
          border-left: 0;
          text-align: center;
          height: 24px;
          padding: 0;
        }

        .bkqtinhmiennam .thu {
          font-size: 13px;
        }

        .bkqtinhmiennam .ngay {
          font-size: 13px;
          text-align: left;
          font-style: italic;
          padding-left: 10px;
        }

        .bkqtinhmiennam .giaithuong {
          font-weight: 700;
          font-size: 13px;
          background-color: #f3f3f3;
          text-align: center;
          color: #b00;
        }

        .bkqtinhmiennam span.loaive {
          float: right;
          padding-right: 10px;
          color: #000;
        }

        .bkqtinhmiennam .tinh {
          font-weight: 700;
          font-size: 13px;
        }

        .bkqtinhmiennam .matinh {
          font-weight: 700;
          font-size: 13px;
          background-color: #f3f3f3;
        }

        .bkqtinhmiennam .giai8l {
          font-size: 13px;
          height: 27px;
        }

        .bkqtinhmiennam .giai8 {
          font-weight: 700;
          color: maroon;
          font-size: 24px;
          line-height: 100%;
        }

        .bkqtinhmiennam .giai4 div,
        .bkqtinhmiennam .giai6 div {
          line-height: 150%;
          display: inline-block;
          font-weight: 700;
        }

        .bkqtinhmiennam .gtgiai8 {
          font-weight: 700;
          text-align: right;
          padding-right: 7px;
          font-size: 14px;
        }

        .bkqtinhmiennam .giai7l {
          font-size: 13px;
          background-color: #f3f3f3;
          height: 27px;
        }

        .bkqtinhmiennam .giai7 {
          font-size: 16px;
          font-weight: 700;
          background-color: #f3f3f3;
          height: 27px;
        }

        .bkqtinhmienna m .gtgiai7 {
          font-weight: 700;
          background-color: #f3f3f3;
          text-align: right;
          padding-right: 7px;
          font-size: 14px;
        }

        .bkqtinhmiennam .giai6l {
          font-size: 13px;
          height: 27px;
        }

        .bkqtinhmiennam .gtgiai6 {
          font-weight: 700;
          text-align: right;
          padding-right: 7px;
          font-size: 14px;
        }

        .bkqtinhmiennam .giai6 div {
          width: 33%;
          float: left;
          font-size: 16px;
        }

        .bkqtinhmiennam .giai5l {
          font-size: 13px;
          background-color: #f3f3f3;
          height: 27px;
        }

        .bkqtinhmiennam .giai5 {
          font-size: 16px;
          font-weight: 700;
          background-color: #f3f3f3;
          height: 27px;
        }

        .bkqtinhmienna m .gtgiai5 {
          font-weight: 700;
          background-color: #f3f3f3;
          text-align: right;
          padding-right: 7px;
          font-size: 14px;
        }

        .bkqtinhmiennam .giai4l {
          font-size: 13px;
          height: 55px;
        }

        .bkqtinhmiennam .giai4 div {
          width: 24%;
          font-size: 16px;
        }

        .bkqtinhmiennam .giai4 {
          text-align: center;
          height: 55px;
        }

        .bkqtinhmiennam .gtgiai4 {
          font-weight: 700;
          text-align: right;
          padding-right: 7px;
          font-size: 14px;
        }

        .bkqtinhmiennam .giai3,
        .bkqtinhmiennam .giai3l {
          font-size: 13px;
          height: 27px;
          background-color: #f3f3f3;
        }

        .bkqtinhmiennam .giai3 {
          text-align: center;
        }

        .bkqtinhmiennam .gtgiai3 {
          background-color: #f3f3f3;
        }

        .bkqtinhmiennam .giai3 div {
          width: 49%;
          display: inline-block;
          float: left;
          font-size: 16px;
          font-weight: 700;
        }

        .bkqtinhmiennam .giai2l {
          font-size: 13px;
          height: 27px;
        }

        .bkqtinhmiennam .giai2 {
          font-size: 16px;
          font-weight: 700;
          height: 27px;
        }

        .bkqtinhmiennam .gtgiai2,
        .bkqtinhmiennam .gtgiai3 {
          font-weight: 700;
          text-align: right;
          padding-right: 7px;
          font-size: 14px;
        }

        .bkqtinhmiennam .giai1l {
          font-size: 13px;
          background-color: #f3f3f3;
          height: 27px;
        }

        .bkqtinhmiennam .giai1 {
          font-size: 16px;
          font-weight: 700;
          background-color: #f3f3f3;
          height: 27px;
        }

        .bkqtinhmienna m .gtgiai1 {
          font-weight: 700;
          background-color: #f3f3f3;
          text-align: right;
          padding-right: 7px;
          font-size: 14px;
        }

        .bkqtinhmiennam .giaidbl {
          font-size: 13px;
          height: 27px;
        }

        .bkqtinhmiennam .giaidb {
          font-weight: 700;
          color: maroon;
          font-size: 18px;
          height: 27px;
        }

        .bkqtinhmiennam .gtgiaianui,
        .bkqtinhmiennam .gtgiaianui5,
        .bkqtinhmiennam .gtgiaidb,
        .bkqtinhmiennam .gtgiaidbp {
          font-size: 14px;
          text-align: right;
          padding-right: 7px;
          font-weight: 700;
        }

        .bkqtinhmiennam .giaianui {
          text-align: right;
          padding-right: 7px;
        }

        .bkqtinhmiennam .giaianui5 {
          text-align: right;
          padding-right: 7px;
          background-color: #f3f3f3;
        }

        .bkqtinhmiennam .gtgiaianui5,
        .bkqtinhmiennam .gtgiaidbp {
          background-color: #f3f3f3;
        }

        .bkqtinhmiennam .giaidbp {
          text-align: right;
          padding-right: 7px;
          background-color: #f3f3f3;
        }

        .bkqtinhmiennam td.bxdauduoi {
          padding: 1px;
          width: 100px;
          vertical-align: top;
        }

        .bkqtinhmienbac {
          border: 1px solid #999;
          background: #fff;
          border-bottom: 0;
          size: 11px;
          width: 100%;
        }

        .bkqtinhmienbac .giai1,
        .bkqtinhmienbac .giai1l,
        .bkqtinhmienbac .giai3,
        .bkqtinhmienbac .giai3l,
        .bkqtinhmienbac .giai5,
        .bkqtinhmienbac .giai5l,
        .bkqtinhmienbac .giai7,
        .bkqtinhmienbac .giai7l,
        .bkqtinhmienbac .giaidbphul,
        .bkqtinhmienbac .giaithuong,
        .bkqtinhmienbac .gtgiai1,
        .bkqtinhmienbac .gtgiai3,
        .bkqtinhmienbac .gtgiai7,
        .bkqtinhmienbac .gtgiaidbphu,
        .bkqtinhmienbac .matinh,
        .bkqtinhmienbac .ngay,
        .bkqtinhmienbac .thu,
        .bkqtinhmienbac td.bxdauduoi {
          background-color: #f3f3f3;
        }

        .bkqtinhmienbac td {
          border: 1px solid #999;
          border-top: 0;
          border-left: 0;
          text-align: center;
          height: 24px;
          padding: 0;
        }

        .bkqtinhmienbac .thu {
          font-weight: 700;
          font-size: 13px;
        }

        .bkqtinhmienbac .ngay {
          font-weight: 700;
          font-size: 13px;
          text-align: left;
          font-style: italic;
          padding-left: 10px;
          color: #03c;
        }

        .bkqtinhmienbac .giaithuong {
          font-weight: 700;
          font-size: 13px;
          text-align: center;
          color: #bf0000;
          width: 120px;
        }

        .bkqt inhmienbac span.loaive {
          float: right;
          color: #000;
          padding-right: 10px;
        }

        .bkqtinhmienbac .gtgiai4,
        .bkqtinhmienbac .gtgiai5,
        .bkqtinhmienbac .gtgiai6,
        .bkqtinhmienbac .gtgiai7 {
          text-align: right;
          padding-right: 7px;
        }

        .bkqtinhmienbac .matinh,
        .bkqtinhmienbac .tinh {
          font-weight: 700;
          font-size: 13px;
        }

        .bkqtinhmienbac .phathanh {
          display: block;
          float: right;
          position: static;
          margin-right: 10px;
          font-style: normal;
          font-weight: 700;
        }

        .bkqtinhmienbac .tngay {
          display: block;
          float: left;
          position: static;
          margin-left: 10px;
        }

        .bkqtinhmienbac .giai6 div,
        .bkqtinhmienbac .giai7 div {
          display: inline-block;
          float: left;
          line-height: 130%;
          font-weight: 700;
        }

        .bkqtinhmienbac .phathanh .tentinh {
          color: #069;
          font-weight: 700;
          font-family: Arial, Helvetica, sans-serif;
        }

        .bkqtinhmienbac .giai8l {
          font-size: 13px;
        }

        .bkqtinhmienbac .giai8 div {
          font-weight: 700;
          color: maroon;
          font-size: 24px;
        }

        .bkqtinhmienbac .giai7l {
          font-size: 13px;
          height: 27px;
        }

        .bkqtinhmienbac .giai7 {
          font-weight: 700;
        }

        .bkqtinhmienbac .gtgiai7 {
          font-weight: 700;
          font-size: 14px;
        }

        .bkqtinhmienbac .giai7 div {
          width: 24%;
          font-size: 18px;
          color: maroon;
        }

        .bkqtinhmienbac .giai6l {
          font-size: 13px;
          height: 27px;
        }

        .bkqtinhmienbac .gtgiai6 {
          font-weight: 700;
          font-size: 14px;
        }

        .bkqtinhmienbac .giai6 div {
          width: 33%;
          font-size: 16px;
        }

        .bkqtinhmienbac .giai3 div,
        .bkqtinhmienbac .giai4 div,
        .bkqtinhmienbac .giai5 div {
          line-height: 16px;
          vertical-align: bottom;
          display: inline-block;
          float: left;
        }

        .bkqtinhmienbac .giai5l {
          font-size: 13px;
          height: 55px;
        }

        .bkqtinhmienbac .giai5 {
          font-size: 16px;
          font-weight: 700;
        }

        .bkqtinhmienbac .gtgiai5 {
          font-weight: 700;
          background-color: #f3f3f3;
          font-size: 14px;
        }

        .bkqtinhmienbac .giai5 div {
          font-size: 16px;
          font-weight: 700;
          height: 16px;
          margin: 4px 0 2px;
          width: 33%;
        }

        .bkqtinhmienbac .giai4l {
          font-size: 13px;
          height: 55px;
        }

        .bkqtinhmienbac .gtgiai4 {
          font-weight: 700;
          font-size: 14px;
        }

        .bkqtinhmienbac .giai4 div {
          width: 49%;
          font-size: 16px;
          font-weight: 700;
          height: 16px;
          margin: 4px 0 2px;
        }

        .bkqtinhmienbac div img {
          margin: 3px 0;
        }

        .bkqtinhmienbac .giai3l {
          font-size: 13px;
          height: 55px;
        }

        .bkqtinhmienbac .giai3 {
          font-size: 13px;
          text-align: center;
        }

        .bkqtinhmienbac .gtgiai1,
        .bkqtinhmienbac .gtgiai2,
        .bkqtinhmienbac .gtgiai3 {
          text-align: right;
          padding-right: 7px;
          font-weight: 700;
        }

        .bkqtinhmienbac .gtgiai3 {
          font-size: 14px;
        }

        .bkqtinhmienbac .giai3 div {
          font-size: 16px;
          font-weight: 700;
          height: 16px;
          margin: 4px 0 2px;
          width: 33%;
        }

        .bkqtinhmienbac .giai2l {
          font-size: 13px;
          height: 27px;
        }

        .bkqtinhmienbac .gtgiai2 {
          font-size: 14px;
        }

        .bkqtinhmienbac .giai2 div {
          width: 49%;
          display: inline-block;
          float: left;
          font-size: 16px;
          font-weight: 700;
          line-height: 130%;
        }

        .bkqtinhmienbac .giai1 div,
        .bkqtinhmienbac .giaidb div {
          display: block;
          width: 100%;
        }

        .bkqtinhmienbac .giai1l {
          font-size: 13px;
          height: 27px;
        }

        .bkqtinhmienbac .giai1 {
          font-size: 16px;
          font-weight: 700;
        }

        .bkqtinhmienbac .gtgiai1 {
          font-size: 14px;
        }

        .bkqtinhmienbac .giaidbl {
          font-size: 13px;
          height: 30px;
        }

        .giaidbl a,
        .giaidbl a:visited {
          color: #000;
        }

        .bkqtinhmienbac .giaidb {
          font-weight: 700;
          color: maroon;
          font-size: 18px;
          height: 30px;
        }

        .bkqtinhmienbac .gtgiaianui,
        .bkqtinhmienbac .gtgiaidb,
        .bkqtinhmienbac .gtgiaidbphu {
          text-align: right;
          padding-right: 7px;
          font-size: 14px;
          font-weight: 700;
        }

        .bkqtinhmienba c .giaidbphul {
          text-align: right;
          padding-right: 7px;
        }

        .bkqtinhmienbac .giaianuil {
          text-align: right;
          padding-right: 7px;
        }

        .btndauduoimien {
          width: 100%;
          height: inherit;
          padding: 0;
          font-size: 10px;
          margin: 0;
        }

        .bkqtinhmienbac td.bxdauduoi {
          width: 100px;
          vertical-align: top;
        }

        .bkqtinhmienbac td.bxdauduoi .dauduoi {
          border: 1px double #999;
          border-right: 0;
          border-bottom: 0;
          size: 11px;
          width: 100%;
          height: 342px;
        }

        .box_kqxs .boxBottom .daysoThongkes {
          float: left;
          width: 100%;
        }

        .box_kqxs .boxBottom {
          width: 100%;
        }

        .box_kqxs .boxBottom .daysoThongke {
          float: left;
          width: 26px;
          height: 22px;
          line-height: 22px;
          border: 0;
          padding: 0;
          white-space: inherit;
        }

        .box_kqxs .boxBottom .daysoThongkes .sodudoan {
          float: left;
          border: 0;
          padding: 0 4px;
          white-space: inherit;
        }

        .box_kqxs .boxBottom .daysoThongke div {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #757171;
          background: radial-gradi ent(circle at 5px 5px, #f7f5f5, #31313a);
          text-shadow: none;
          color: #fff;
          line-height: 16px;
          text-align: center;
          font-size: 15px;
          margin: 3px auto;
        }

        .shadow,
        h1.ttxstt,
        h1.ttxstt_waitting {
          text-shadow: 0 1px 0 #fff, 0 2px 2px #c8c8c8;
        }

        .bangkq6x36 td.title a,
        .bangkqmega td.title a,
        .bkq123 td.title a,
        .bkqtt4 a {
          color: #000;
        }

        .boxdauduoimien td.shadow {
          font-weight: 700;
          position: relative;
        }

        .boxBottom .sodudoan div img {
          margin: 3px 0 2px;
        }

        .box_kqxs .boxBottom .daysoThongke.daysoThongkeClick div,
        .box_kqxs .boxBottom .daysoThongke.daysoThongkeHover div {
          background: radial-gradient(circle at 5px 5px, gold, #001);
        }

        .box_kqxs .boxBottom .config_Bangketqua_list {
          float: left;
          height: 20px;
          line-height: 20px;
          margin-right: 10px;
          margin-left: 1px;
          border: 0;
          padding: 0;
          white-space: inherit;
        }

        .bkqmiennam .bkqtinhmienbac > tbody > tr:last-child > td,
        .boxBottom {
          border-bottom: 1px solid #9e9e9e;
        }

        .box_kqxs .boxBottom .config_Item {
          float: left;
          padding: 0 6px;
          border-right: 1px solid #9e9e9e;
        }

        .boxdauduoimien .btndauduoimien {
          width: 80px;
          height: 18px;
          padding: 0;
          font-size: 11px;
          margin: 0;
        }

        .bangkq6x36 td,
        .bangkqmega td,
        .bkq123 td,
        .bkqtt4 td {
          height: auto;
        }

        .bangkq6x36 div.title,
        .bangkqmega div.title,
        .bkq123 div.title,
        .bkqtt4 div.title {
          border-bottom: 1px solid #efefef;
          padding: 2px 0;
        }

        .bangkq6x36,
        .bangkqmega,
        .bangkqmega div.title,
        .bkq123,
        .bkq123 div.title,
        .bkqtt4,
        .bkqtt4 div.title {
          margin: 5px 0;
        }

        .bangkq6x36 div.title {
          margin: 5px 0;
        }

        .bangkq6x36 td.title {
          font-weight: 700;
          text-align: left;
        }

        .bangkq6x36 .finnish0 {
          background-position: left 0;
        }

        .bangkq6x36 .finnish1 {
          background-position: left -387px;
        }

        .bangkq6x36 .finnish2 {
          background-position: left -173px;
        }

        .bangkq6x36 .finnish3 {
          background-position: left -302px;
        }

        .bangkq6x36 .finnish4 {
          background-position: left -43px;
        }

        .bangkq6x36 .finnish5,
        .bangkq6x36 .finnish6 {
          background-position: left -432px;
        }

        .bangkq6x36 .finnish7 {
          background-position: left -302px;
        }

        .bangkq6x36 .finnish8 {
          background-position: left -344px;
        }

        .bangkq6x36 .finnish9 {
          background-position: left -387px;
        }

        .bangkqmega td.title {
          font-weight: 700;
          text-align: left;
        }

        .bangkqmega .finnish0 {
          background-position: left 0;
        }

        .bangkqmega .finnish1,
        .bangkqmega .finnish2,
        .bangkqmega .finnish3,
        .bangkqmega .finnish4,
        .bangkqmega .finnish5 {
          background-position: left -387px;
        }

        .bangkqmega .finnish6 {
          background-position: left -432px;
        }

        .bangkqmega .finnish7 {
          background-position: left -302px;
        }

        .bkqtt4 td.title {
          font-weight: 700;
          text-align: left;
        }

        .bangkq6x36 div.bool,
        .bangkq6x36 div.bool.rand,
        .bangkqmega div.bool,
        .bkq123 div.bool,
        .bkq123 div.bool.rand,
        .bkqtt4 div.bool,
        .bkqtt4 div.bool.rand {
          font-size: 20px;
          width: 40px;
          display: inline-block;
          border: 0;
          vertical-align: middle;
          position: static;
          padding-left: 0;
          padding-top: 7px;
          font-weight: 700;
        }

        .bkq123 td.title {
          font-weight: 700;
          text-align: left;
        }

        .bkqtt4.finnish0 {
          background-position: left 0;
        }

        .bkqtt4 .finnish1 {
          background-position: left -387px;
        }

        .bkqtt4 .finnish2 {
          background-position: left -173px;
        }

        .bkqtt4 .finnish3 {
          background-position: left -302px;
        }

        .bkqtt4 .finnish4 {
          background-position: left -43px;
        }

        .bkqtt4 .finnish5 {
          background-position: left -215px;
        }

        .bkqtt4 .finnish6 {
          background-position: left -258px;
        }

        .bkqtt4 .finnish7 {
          background-position: left -302px;
        }

        .bkqtt4 .finnish8 {
          background-position: left -344px;
        }

        .bkqtt4 .finnish9 {
          background-position: left -387px;
        }

        .bkq123 .finnish0 {
          background-position: left 0;
        }

        .bkq123 .finnish1,
        .bkq123 .finnish2 {
          background-position: left -387px;
        }

        .bkq123 .finnish3 {
          background-position: left -43px;
        }

        .bkq123 .finnish4 {
          background-position: left -302px;
        }

        .bkq123 .finnish5,
        .bkq123 .finnish6 {
          background-position: left -432px;
        }

        .bkq123 .finnish7 {
          background-position: left -302px;
        }

        .bkq123 .finnish8 {
          background-position: left -344px;
        }

        .bkq123 .finnish9 {
          background-position: left -387px;
        }

        .bangkq6x36 div.bool.rand,
        .bkq123 div.bool.rand,
        .bkqtt4 div.bool.rand {
          height: 43px;
          margin: 3px;
          text-align: center;
        }

        .bangkq6x36 img,
        .bkq123 img,
        .bkqtt4 img {
          height: 16px;
          margin-top: 5px;
        }

        .bangkq6x36 img.waiting,
        .bkq123 img.waiting,
        .bkqtt4 img.waiting {
          height: 20px;
          margin-top: 3px;
        }

        .bangkq6x36 div.bool,
        .bangkqmega div.bool,
        .bkq123 div.bool,
        .bkqtt4 div.bool {
          background-repeat: no-repeat;
          height: 36px;
          margin: 3px;
          text-align: center;
          float: left;
        }

        #box_tracuukqxs {
          height: 120 px;
        }

        #statusbar {
          color: red;
          font-size: 11px;
          font-family: Verdana, Geneva, sans-serif;
          font-weight: 70 0;
          border: 1px solid #e1e1e1;
          border-radius: 5px;
          clear: both;
          margin-bottom: 5px;
          min-height: 20px;
          line-height: 20px;
          padding: 2px 5px;
        }

        #statusbar a.running {
          color: #ae0921;
          display: block;
          padding-left: 40px;
        }

        #statusbar a.waitting,
        #statusbar span.waitting {
          padding-left: 40px;
          display: block;
        }

        #statusbar a.waitting {
          color: #06c;
        }

        #statusbar span.waitting {
          color: #000;
        }

        #statusbar a.finnish {
          color: #06c;
          display: block;
          padding-left: 30px;
        }

        div.div_tab_thu {
          display: block;
          clear: both;
          height: 19px;
          border-bottom: 2px solid #ccc;
          padding-top: 5px;
        }

        ul.tab_thu li {
          float: left;
          margin: 0 1px 0 0;
        }

        ul.tab_thu li a span {
          font-size: 12px;
          line-height: 12px;
          border: 1px solid #ccc;
          border-radius: 5px 5px 0 0;
          border-bottom: 0;
          font-weight: 700;
          color: #333;
          padding: 3px 7px;
        }

        div#pagenav {
          text-align: center;
          clear: both;
          display: block;
          margin: 5px 0;
        }

        ul.pagenav {
          overflow: hidden;
          width: inherit;
          display: inline-table;
          margin: 0 auto;
          padding: 0;
        }

        ul.pagenav li {
          float: left;
          border: 1px solid #ccc;
          margin: 2px;
        }

        .sodauduoi_mienbac,
        .sodauduoi_miennam {
          border: 1px double #999;
          margin-bottom: 10px;
          line-height: 200%;
          size: 11px;
        }

        ul.pagenav li.active {
          background-color: #999;
        }

        ul.pagenav li a {
          display: block;
          text-align: center;
          padding: 1px 5px;
        }

        ul.pagenav li a.active {
          background: #ffd7d7;
          color: #000;
        }

        ul.pagenav li a.f_link {
          color: #ccc;
          cursor: not-allowed;
        }

        .dauduoi {
          border: 1px double #999;
          border-right: 0;
          border-bottom: 0;
          size: 11px;
          width: 100%;
          height: 314px;
        }

        .boxdauduoimien td,
        div.boxdauduoimien {
          border: 1px double #999;
          font-family: Tahoma, Geneva, sans-serif;
        }

        .dauduoi td {
          font-family: Tahoma, Geneva, sans-serif;
          font-size: 11px;
        }

        .bkqtinh_kq {
          height: 315px;
        }

        td.somien,
        td.sotinh {
          font-size: 13px;
          font-family: Tahoma, Geneva, sans-serif;
        }

        div.boxdauduoimien_home h4,
        div.boxdauduoimien_online h4 {
          font-size: 16px;
          color: #fff;
          text-transform: uppercase;
          text-align: center;
        }

        .boxdauduoimien td {
          border-top: 0;
          border-left: 0;
          text-align: center;
          padding: 1px;
          height: inherit;
          line-height: 1;
          white-space: nowrap;
          font-weight: 400;
        }

        div.boxdauduoimien {
          border-top: 0;
          border-bottom: 0;
          text-align: ce nter;
          padding: 1px 0;
          height: inherit;
          margin: 0;
          background-color: #fff;
          min-height: 24px;
        }

        .boxdauduoimien_home td {
          border: 1px double #999;
          border-top: 0;
          border-left: 0;
          text-align: center;
          height: inherit;
          font-family: Tahoma, Geneva, sa ns-serif;
          padding: 0;
          line-height: 1.3;
        }

        div.boxdauduoimien_home {
          border: 1px solid #999;
          text-align: center;
          padding: 1px;
          height: inherit;
          border-radius: 5px;
          overflow: hidden;
        }

        div.boxd auduoimien_home h4 {
          border-radius: 4px 4px 0 0;
          border: 1px solid #666;
          margin-bottom: 1px;
          line-height: 25px;
          font-family: "Times New Roman", Times, serif;
        }

        .boxdauduoimien_online td {
          border: 1px double #999;
          border-top: 0;
          border-left: 0;
          text-align: center;
          height: inherit;
          font-family: Tahoma, Geneva, sa ns-serif;
          padding: 0;
          line-height: 1.3;
        }

        div.boxdauduoimien_online {
          border: 1px solid #999;
          text-align: center;
          padding: 1px;
          height: inherit;
          margin: 10px 0;
          border-radius: 5px;
          overflow: hidden;
        }

        div.boxdauduoimien_online h4 {
          border-radius: 4px 4px 0 0;
          border: 1px solid #666;
          margin-bottom: 1px;
          line-height: 25px;
          font-family: "Times New Roman", Times, serif;
        }

        div.boxdauduoimien_online_mb {
          border: 1px solid#999;
          border-top: 0;
          border-bottom: 0;
          text-align: center;
          margin: 0;
        }

        .boxdauduoimien_online_mb table {
          height: 341px;
        }

        .boxdauduoimien_online_mb td {
          border: 1px double #999;
          border-top: 0;
          border-left: 0;
          text-align: center;
          padding: 1px;
          height: inherit;
        }

        .border {
          border-bottom: 0;
          border-right: 0;
          border-left: 1px #e6e6e6 solid;
          border-top: 1px #e6e6e6 solid;
        }

        .border td,
        td.border {
          border-top: 0;
          border-left: 0;
          border-right: 1px #e6e6e6 solid;
          border-bottom: 1px #e6e6e6 solid;
          height: auto;
        }

        .boxBottom {
          float: left;
          position: relative;
          z-index: 2;
          background: #f5e9c3;
          border-left: 1px solid #9e9e9e;
          border-right: 1px solid #9e9e9e;
        }

        .boxdauduoimien .boxBottom {
          border-right: 0;
          border-left: 0;
        }

        .boxBottom .config_Bangketqua_list .config_Item {
          font-weight: 400;
        }

        .boxBottom .menuSound,
        .boxBottom .showLoto {
          padding: 0 2px;
          font-size: 11px;
          font-weight: 400;
          min-width: 80px;
          text-align: center;
          float: right;
          border: 0;
          background: 0 0;
          border-left: 1px solid #9e9e9e;
          height: 20px;
          line-height: 20px;
          margin: 0;
        }

        .boxdauduoimien > div > table,
        .boxdauduoimi en > div > table tr > td.bangSo {
          border: none;
        }

        #box_tructiepkqxs .box_kqxstt_mienbac .boxdauduoimien td.bangSo {
          border-right: 0;
        }

        .boxdauduoimien div.boxdauduoimien_online {
          border: none;
          margin: 0;
          border-radius: 0;
        }

        .boxdauduoimien div.boxdauduoimien_online h4 {
          display: none;
        }

        h1.ttxstt,
        h1.ttxstt_waitting {
          font-weight: 700;
          font-family: Verdana, Geneva, sans -serif;
          font-size: 12px;
          padding-left: 5px;
          margin-bottom: 5px;
          text-align: center;
          display: block;
        }

        h1.ttx stt {
          color: #06c;
        }

        h1.ttxstt_waitting {
          color: #06c;
        }

        .ui-button-icon-only.ui-dialog-titlebar-close {
          display: none;
        }

        .bkqmiennam {
          color: #322c20;
          font: 11px Arial, Helvetica, sans-serif;
          line-height: 1.5;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 11px;
          cursor: pointer;
          -webkit-border-horizontal-spacing: 0px;
          -webkit-border-vertical-spacing: 0px;
          background-color: #fff;
          size: 11px;
          width: 100%;
          border: 1px solid #9e9e9e;
          border-right: 0;
          border-bottom: 0;
          max-width: 520px;
        }
      `}</style>
    </>
  );
};

export default FormKQXS;
