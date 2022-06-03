import axiosClient from "../axios";

const pageService = {

  title: {
    set: function (title)
    {
      document.title = title;
    },
    get: function ()
    {
      return document.title;
    }
  }
}

export default pageService
