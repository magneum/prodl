import axios from "axios";
var Tube = require("tube-exec");
var progress = require("progress-estimator")();

export default async function search(request: any, response: any) {
  try {
    let _ALINK: any;
    let _userIO = request.query.q as string;
    var _MDATA = await axios.get(
      "https://magneum.vercel.app/api/youtube_sr?q=" + _userIO
    );
    var _FOUND = _MDATA.data._youtube_search[0];
    var _DROP = Tube(_FOUND.LINK, {
      noWarnings: true,
      dumpSingleJson: true,
      preferFreeFormats: true,
      noCheckCertificates: true,
      addHeader: ["referer:youtube.com", "user-agent:googlebot"],
    });
    var object = await progress(_DROP, "Obtaining: " + " ");
    // =========================================================
    var a_ultralow = object.formats.filter(
      (vos: any) => vos.format_id === "599" || vos.format_id === "600"
    );
    var db_ultralow = a_ultralow[0] || a_ultralow[1] || a_ultralow;
    var a_low = object.formats.filter(
      (vos: any) =>
        vos.format_id === "139" ||
        vos.format_id === "249" ||
        vos.format_id === "250"
    );
    var db_low = a_low[0] || a_low[1] || a_low[2] || a_low;
    var a_medium = object.formats.filter(
      (vos: any) => vos.format_id === "140" || vos.format_id === "251"
    );
    var db_medium = a_medium[0] || a_medium[1] || a_medium;

    if (db_medium.width !== undefined) {
      _ALINK = db_medium.url;
    } else if (db_medium.width === undefined && db_low.width !== undefined) {
      _ALINK = db_low.url;
    } else if (
      db_medium.width === undefined &&
      db_low.width === undefined &&
      db_ultralow.width !== undefined
    ) {
      _ALINK = db_ultralow.url;
    }
    // =========================================================
    var v_1080p = object.formats.filter(
      (vos: any) =>
        vos.format_id === "399" ||
        vos.format_id === "137" ||
        vos.format_id === "248"
    );
    var T_1080p = v_1080p[2] || v_1080p[1] || v_1080p[0] || v_1080p;
    var v_720p = object.formats.filter(
      (vos: any) =>
        vos.format_id === "247" ||
        vos.format_id === "398" ||
        vos.format_id === "136" ||
        vos.format_id === "22"
    );
    var T_720p = v_720p[3] || v_720p[2] || v_720p[1] || v_720p[0] || v_720p;
    var v_480p = object.formats.filter(
      (vos: any) =>
        vos.format_id === "397" ||
        vos.format_id === "135" ||
        vos.format_id === "244"
    );
    var T_480p = v_480p[0] || v_480p[1] || v_480p[2] || v_480p;
    var v_360p = object.formats.filter(
      (vos: any) =>
        vos.format_id === "396" ||
        vos.format_id === "134" ||
        vos.format_id === "18" ||
        vos.format_id === "243"
    );
    var T_360p = v_360p[0] || v_360p[1] || v_360p[2] || v_360p[3] || v_360p;
    var v_240p = object.formats.filter(
      (vos: any) =>
        vos.format_id === "395" ||
        vos.format_id === "133" ||
        vos.format_id === "242"
    );
    var T_240p = v_240p[0] || v_240p[1] || v_240p[2] || v_240p;
    var v_144p = object.formats.filter(
      (vos: any) =>
        vos.format_id === "17" ||
        vos.format_id === "597" ||
        vos.format_id === "598" ||
        vos.format_id === "394" ||
        vos.format_id === "160" ||
        vos.format_id === "278"
    );
    var T_144p =
      v_144p[0] ||
      v_144p[1] ||
      v_144p[2] ||
      v_144p[3] ||
      v_144p[4] ||
      v_144p[5] ||
      v_144p;
    // =========================================================
    if (T_1080p.width !== undefined) {
      return response.status(200).json({
        success: true,
        _audio: _ALINK,
        _search: _FOUND,
        _video: {
          _1080p: T_1080p.url,
          _720p: T_720p.url,
          _480p: T_480p.url,
          _360p: T_360p.url,
          _240p: T_240p.url,
          _144p: T_144p.url,
        },
      });
    } else if (T_1080p.width === undefined && T_720p.width !== undefined) {
      return response.status(200).json({
        success: true,
        _audio: _ALINK,
        _search: _FOUND,
        _video: {
          _1080p: undefined,
          _720p: T_720p.url,
          _480p: T_480p.url,
          _360p: T_360p.url,
          _240p: T_240p.url,
          _144p: T_144p.url,
        },
      });
    } else if (
      T_1080p.width === undefined &&
      T_720p.width === undefined &&
      T_480p.width !== undefined
    ) {
      return response.status(200).json({
        success: true,
        _audio: _ALINK,
        _search: _FOUND,
        _video: {
          _1080p: undefined,
          _720p: undefined,
          _480p: T_480p.url,
          _360p: T_360p.url,
          _240p: T_240p.url,
          _144p: T_144p.url,
        },
      });
    } else if (
      T_1080p.width === undefined &&
      T_720p.width === undefined &&
      T_480p.width === undefined &&
      T_360p.width !== undefined
    ) {
      return response.status(200).json({
        success: true,
        _audio: _ALINK,
        _search: _FOUND,
        _video: {
          _1080p: undefined,
          _720p: undefined,
          _480p: undefined,
          _360p: T_360p.url,
          _240p: T_240p.url,
          _144p: T_144p.url,
        },
      });
    } else if (
      T_1080p.width === undefined &&
      T_720p.width === undefined &&
      T_480p.width === undefined &&
      T_360p.width === undefined &&
      T_240p.width !== undefined
    ) {
      return response.status(200).json({
        success: true,
        _audio: _ALINK,
        _search: _FOUND,
        _video: {
          _1080p: undefined,
          _720p: undefined,
          _480p: undefined,
          _360p: undefined,
          _240p: T_240p.url,
          _144p: T_144p.url,
        },
      });
    } else if (
      T_1080p.width === undefined &&
      T_720p.width === undefined &&
      T_480p.width === undefined &&
      T_360p.width === undefined &&
      T_240p.width === undefined &&
      T_144p.width !== undefined
    ) {
      return response.status(200).json({
        success: true,
        _audio: _ALINK,
        _search: _FOUND,
        _video: {
          _1080p: undefined,
          _720p: undefined,
          _480p: undefined,
          _360p: undefined,
          _240p: undefined,
          _144p: T_144p.url,
        },
      });
    } else {
      return response.status(400).json({
        success: false,
        error: "ERROR: no downloadable video link found.",
      });
    }
  } catch (error: any) {
    console.log(error);
    return response.status(500).json({
      status: "error",
      message: error.mesage,
    });
  }
}
