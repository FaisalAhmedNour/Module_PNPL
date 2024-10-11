import ApiService from "./ApiService";

// export async function apiCall(url, method, payload) {
//     return window.engine.Proxy(url, method, payload)
// }

// export async function apiSignUp(data) {
//     return ApiService.fetchData({
//         url: '/sign-up',
//         method: 'post',
//         data,
//     })
// }

// export async function apiSignOut(data) {
//     return ApiService.fetchData({
//         url: '/sign-out',
//         method: 'post',
//         data,
//     })
// }

// export async function apiForgotPassword(data) {
//     return ApiService.fetchData({
//         url: '/forgot-password',
//         method: 'post',
//         data,
//     })
// }

// export async function apiResetPassword(data) {
//     return ApiService.fetchData({
//         url: '/reset-password',
//         method: 'post',
//         data,
//     })
// }

// get requests
export async function getAllServices() {
  return ApiService.fetchData({
    url: "/pub/services/list",
    method: "get",
    // data,
  });
}

export async function getWorkLog(from, to) {
  return ApiService.fetchData({
    url: "/dashboard/processStats?from=" + from + "&to=" + to,
    method: "get",
  });
}

export async function getCompanies(page, perPage) {
  return ApiService.fetchData({
    url: "/pub/company/list" + `?page=${page}&perPage=${perPage}`,
    method: "get",
  });
}

export async function selfInfo() {
  return ApiService.fetchData({
    url: "/info/self",
    method: "get",
  });
}

export async function investmentInfo() {
  return ApiService.fetchData({
    url: "/info/investment",
    method: "get",
  });
}

export async function verifyEmail(id, OTP, optSec) {
  return ApiService.fetchData({
    url: "/pub/verify-email?id=" + id + "&OTP=" + OTP + "&otpSec=" + optSec,
    method: "get",
  });
}

export async function getServices(data) {
  return ApiService.fetchData({
    url: "/ownedProcesses",
    method: "get",
    data,
  });
}

export async function getBuyers(data) {
  return ApiService.fetchData({
    url: "/buyers",
    method: "get",
    data,
  });
}

export async function getProcesses(data) {
  return ApiService.fetchData({
    url: "/processes",
    method: "get",
    data,
  });
}

export async function getCartData(data) {
  return ApiService.fetchData({
    url: "/cart",
    method: "get",
    data,
  });
}

export async function getUploadedFile(process) {
  const result = await ApiService.fetchData({
    url: "/protected/" + process + "/fileList",
    method: "get",
  });
  // console.log(result)
  return result;
}

export async function getUploadedFileData(id, process) {
  return ApiService.fetchData({
    url: "/protected/" + process + "/getFile/" + id,
    method: "get",
  });
}

export async function getBatchFIlesListOfExpIssuance(process) {
  return ApiService.fetchData({
    url: "/protected/" + process + "/batchList",
    method: "get",
  });
}

export async function getUpdatedInfo(process) {
  return ApiService.fetchData({
    url: "/protected/" + process + "/userMeta?metaName=" + process,
    method: "get",
  });
}

export async function getBatchData(id) {
  return ApiService.fetchData({
    url: "/protected/6578e4ecf0464d7fb253de58/batchFileContent/" + id,
    method: "get",
  });
}

export async function getSeason() {
  return ApiService.fetchData({
    url: "/admin/reports/AllAsCSV",
    method: "get",
  });
}

export async function getUsersList(page, perPage, name) {
  return ApiService.fetchData({
    url: `/admin/user?page=${page}&perpage=${perPage}${name ? `&Name=${name}` : ""
      } `,
    // url: `/admin/user?Name=${name}`,
    method: "get",
  });
}

export async function getUsersSuggestionList(page, perPage, queries) {
  return ApiService.fetchData({
    url: `/admin/user?page=${page}&perpage=${perPage}${queries?.from ? `&creation_date_from=${queries?.from}` : ""
      }${queries?.to ? `&creation_date_to=${queries?.to}` : ""
      }${queries?.name ? `&Name=${queries?.name}` : ""
      }${queries?.email ? `&email=${queries?.email}` : ""
      }${queries?.mobileNo ? `&mobile_no=${queries?.mobileNo}` : ""
      }${queries?.companyId ? `&company_id=${queries?.companyId}` : ""
      }${queries?.accountType ? `&account_type=${queries?.accountType}` : ""
      } `,
    method: "get",
  });
}

export async function paymentRequests(
  method,
  queries,
  data
) {
  return ApiService.fetchData({
    url:
      // "/admin/transactions/list?perPage=" + perPage + "&page=" + page + "&Status=" + type + (from && to) && `&from=${from}&to=${to}`,
      `/admin/transactions${(method === 'get') ? (`?perPage=${queries?.perPage}&page=${queries?.page}&Status=${queries?.type}${queries?.from && queries?.to ? `&from=${queries?.from}&to=${queries?.to}` : ""}${queries?.userId ? `&uid=${queries?.userId}` : ""}`) : ''}`,
    method,
    data,
  });
}

export async function paymentRequestsForInvestment(
  method,
  queries,
  data
) {
  return ApiService.fetchData({
    url:
      // "/admin/transactions/list?perPage=" + perPage + "&page=" + page + "&Status=" + type + (from && to) && `&from=${from}&to=${to}`,
      `/admin/invTnx${(method === 'get') ? (`?perPage=${queries?.perPage}&page=${queries?.page}&Status=${queries?.type}${queries?.from && to ? `&from=${queries?.from}&to=${queries?.to}` : ""}${queries?.userId ? `&uid=${queries?.userId}` : ""}`) : ''}`,
    method,
    data,
  });
}

export async function zoneSetup(
  method,
  data,
  type
) {
  return ApiService.fetchData({
    url:
      // `/admin/eZone${(method === 'get') ? (`?perPage=${queries?.perPage}&page=${queries?.page}&Status=${queries?.type}${queries?.from && to ? `&from=${queries?.from}&to=${queries?.to}` : ""}${queries?.userId ? `&uid=${queries?.userId}` : ""}`) : ''}`,
      `/admin/eZone${(method === 'get' && type) ? `?type=${type}` : ''}`,
    method,
    data,
  });
}

export async function companySetup(
  method,
  data,
  queries
) {
  return ApiService.fetchData({
    url:
      `/admin/company${(method === 'get') ? `?page=${queries?.page}&perPage=${queries?.perPage}` : ''}`,
    method,
    data,
  });
}

export async function publicZone(
  type
) {
  return ApiService.fetchData({
    url:
      `/pub/eZone${type ? `?type=${type}` : ''}`,
    method: 'get',
  });
}

export async function getUserStatement(from, to, filter) {
  return ApiService.fetchData({
    url: "/dashboard/statement?from=" + from + "&to=" + to + "&filter=" + filter,
    method: "get",
  });
}

export async function getUserStatementFromAdmin(userId, from, to, filter) {
  return ApiService.fetchData({
    url: "/admin/reports/UserStatements?from=" + from + "&to=" + to + "&filter=" + filter + "&id=" + userId,
    method: "get",
  });
}

export async function servicesSetupFromAdmin(method, data, id, onlyName, page = 0, perPage = 10) {
  return ApiService.fetchData({
    url: `/admin/services?page=${page}&perPage=${perPage}${id ?
      (onlyName ? '?id=' + id + '&onlyName=' + true : '?id=' + id) :
      ''
      }`,
    method: method,
    data
  });
}

export async function buyerSetupFromAdmin(method, data, id, onlyName, page = 0, perPage = 10) {
  return ApiService.fetchData({
    url: `/admin/buyer?page=${page}&perPage=${perPage}${onlyName ? `&onlyName=${onlyName}` : ''}${id ? `&id=${id}` : ''}`,
    method: method,
    data
  });
}

export async function processSetupFromAdmin(method, data, id, onlyName, page = 0, perPage = 10) {
  return ApiService.fetchData({
    url: `/admin/process?page=${page}&perPage=${perPage}${onlyName ? `&onlyName=${onlyName}` : ''}${id ? `&id=${id}` : ''}`,
    method: method,
    data
  });
}

export async function offerSetupFromAdmin(method, data, id, onlyName, page = 0, perPage = 10) {
  return ApiService.fetchData({
    url: `/admin/offer?page=${page}&perPage=${perPage}${onlyName ? `&onlyName=${onlyName}` : ''}${id ? `&id=${id}` : ''}`,
    method: method,
    data
  });
}

// export async function getPaymentRequestsDyDate(type, page, perPage, from, to) {
//   return ApiService.fetchData({
//     url:
//       "/admin/transactions/list?perPage=" +
//       perPage +
//       "&page=" +
//       page +
//       "&Status=" +
//       type +
//       "&from=" +
//       from +
//       "&to=" +
//       to,
//     method: "get",
//   });
// }

export async function getUpdatedVersion(process) {
  return ApiService.fetchData({
    url: "/protected/" + process + "/getprocess",
    method: "get",
  });
}

//---------------------------------------
export async function getLibraryNames() {
  return ApiService.fetchData({
    url: "/admin/lib/getlist",
    method: "get",
  });
}

export async function getLibraryRecords(name) {
  return ApiService.fetchData({
    url: "/admin/lib/getRecords?Name=" + name,
    method: "get",
  });
}

export async function getLibraryRecordsForUser(name) {
  return ApiService.fetchData({
    url: "/lib/getRecords?Name=" + name,
    method: "get",
  });
}

export async function getLibraryHeaders(name) {
  return ApiService.fetchData({
    url: "/admin/lib/getHeaders?Name=" + name,
    method: "get",
  });
}

export async function getLibraryNamesForUsers() {
  return ApiService.fetchData({
    url: "/lib/getlist",
    method: "get",
  });
}

// Post requests
export async function signup(data) {
  return ApiService.fetchData({
    url: "/pub/registration",
    method: "post",
    data,
  });
}

export async function createUserFromAdmin(data) {
  return ApiService.fetchData({
    url: "/admin/user",
    method: "post",
    data,
  });
}

export async function forgotPassword(data) {
  return ApiService.fetchData({
    url: "/pub/password-recovery",
    method: "post",
    data,
  });
}

export async function newForgotPassword(data) {
  return ApiService.fetchData({
    url: "/pub/verify-recovery",
    method: "post",
    data,
  });
}

export async function resetPassword(data) {
  return ApiService.fetchData({
    url: "/pub/registration",
    method: "post",
    data,
  });
}

export async function changePassword(data) {
  return ApiService.fetchData({
    url: "/user/changepassword",
    method: "post",
    data,
  });
}

export async function isEmailExist(data) {
  return ApiService.fetchData({
    url: "/pub/registration",
    method: "post",
    data,
  });
}

export async function createService(data) {
  return ApiService.fetchData({
    url: "/create_service",
    method: "post",
    data,
  });
}

export async function createBuyers(data) {
  return ApiService.fetchData({
    url: "/create_buyer",
    method: "post",
    data,
  });
}

export async function createProcess(data) {
  return ApiService.fetchData({
    url: "/process_create",
    method: "post",
    data,
  });
}

export async function shoppingCart(method, data) {
  return ApiService.fetchData({
    url: "/cart",
    method,
    data,
  });
}

export async function payment(method, data) {
  return ApiService.fetchData({
    url: "/tnx",
    method,
    data,
  });
}

export async function RechargeRequest(data) {
  return ApiService.fetchData({
    url: "/transactions/request",
    method: "post",
    data,
  });
}

export async function UploadFile(process, data) {
  return ApiService.fetchData({
    url: "/protected/" + process + "/uploadFile",
    method: "post",
    data,
  });
}

export async function MakeBatch(process, data) {
  return ApiService.fetchData({
    url: "/protected/" + process + "/makeBatch",
    method: "post",
    data,
  });
}

export async function UpdateUserMeta(process, data) {
  return ApiService.fetchData({
    url: "/protected/" + process + "/saveUserMeta",
    method: "post",
    data,
  });
}

export async function SearchInExpIssue(process, page, rowPerPage, data) {
  return ApiService.fetchData({
    url:
      "/protected/" +
      process +
      "/getData?page=" +
      page +
      "&perPage=" +
      rowPerPage,
    method: "post",
    data,
  });
}

export async function UploadExpRegisterFile(data) {
  return ApiService.fetchData({
    url: "/exp/upload",
    method: "post",
    data,
  });
}

export async function UploadExpLCContactFile(data) {
  return ApiService.fetchData({
    url: "/explc/upload",
    method: "post",
    data,
  });
}

export async function UpdateExpIssueBatchData(id, uploadId, data) {
  return ApiService.fetchData({
    url: "/protected/" + id + "/editData/" + uploadId,
    method: "post",
    data,
  });
}

export async function GetExpRegisterFile(page, perPage, from, to, data) {
  return ApiService.fetchData({
    url:
      "/exp/getexp?perPage=" +
      perPage +
      "&page=" +
      page +
      "&from=" +
      from +
      "&to=" +
      to,
    method: "post",
    data,
  });
}

export async function GetExpLCContactFile(page, perPage, from, to, data) {
  return ApiService.fetchData({
    url:
      "/explc/getexp?perPage=" +
      perPage +
      "&page=" +
      page +
      "&from=" +
      from +
      "&to=" +
      to,
    method: "post",
    data,
  });
}

//------------------------------------------------
export async function CreateNewLibrary(data) {
  return ApiService.fetchData({
    url: "/admin/lib/new",
    method: "post",
    data,
  });
}

export async function SetLibraryHeader(data) {
  return ApiService.fetchData({
    url: "/admin/lib/setHeaders",
    method: "post",
    data,
  });
}

export async function ModifyLibraryRecords(data) {
  return ApiService.fetchData({
    url: "/admin/lib/modifyRecords",
    method: "post",
    data,
  });
}

export async function ModifyLibraryRecordsForUser(data) {
  return ApiService.fetchData({
    url: "/lib/modifyRecords",
    method: "post",
    data,
  });
}

export async function AddDeleteUpdateCommission(data) {
  return ApiService.fetchData({
    url: "/admin/transactions/commition",
    method: "post",
    data,
  });
}

// export async function getUploadedDataOfExpIssuance(process, page, perPage, data) {
//     return ApiService.fetchData({
//         url: '/protected/' + process + '/getData?page=' + page + '&&perPage=' + perPage,
//         // url: '/protected/657da3f94e55d48baa188067/getData?page=' + page + '&&perPage=' + perPage,
//         method: 'get',
//         data
//     })
// }

// patch request
export async function lotRegistration(data) {
  return ApiService.fetchData({
    url: "/user",
    method: "patch",
    data,
  });
}

export async function updateFileDataOfDataPreparation(id, data, process) {
  return ApiService.fetchData({
    url: "/protected/" + process + "/updateFileContent/" + id,
    method: "patch",
    data,
  });
}

export async function saveFile(id, process) {
  return ApiService.fetchData({
    url: "/protected/" + process + "/markSaved/" + id,
    method: "patch",
  });
}

// export async function paymentRequestAcceptAndDeny(data) {
//   return ApiService.fetchData({
//     url: "/admin/transactions/applyAction",
//     method: "patch",
//     data,
//   });
// }

// delete request
export async function deleteCartItem(data) {
  return ApiService.fetchData({
    url: "/cart/delete",
    method: "DELETE",
    data,
  });
}

export async function deleteUploadedData(id, process) {
  return ApiService.fetchData({
    url: "/protected/" + process + "/deleteFile/" + id,
    method: "DELETE",
  });
}

export async function deleteUploadedDataFromExpIssuance(data) {
  return ApiService.fetchData({
    url: "/protected/6578e4ecf0464d7fb253de58/data/delete",
    method: "DELETE",
    data,
  });
}

export async function deleteBatchFileFromSingleExpIssue(process, id) {
  return ApiService.fetchData({
    url: "/protected/" + process + "/deleteBatch/" + id,
    method: "DELETE",
  });
}

// export async function addClient(data) {
//     return ApiService.fetchData({
//         url: '/client',
//         method: 'post',
//         data,
//     })
// }

// export async function clientList(data) {
//     return ApiService.fetchData({
//         url: '/client',
//         method: 'get',
//         data,
//     })
// }

// export async function addUserApi(data) {
//     return ApiService.fetchData({
//         url: '/user/register',
//         method: 'post',
//         data,
//     })
// }

// export async function getUserApi(data) {
//     return ApiService.fetchData({
//         url: '/user/list',
//         method: 'get',
//         data,
//     })
// }

// export async function createTaskApi(data) {
//     return ApiService.fetchData({
//         url: '/task',
//         method: 'post',
//         data,
//     })
// }

// export async function getTaskApi(data) {
//     return ApiService.fetchData({
//         url: '/task',
//         method: 'get',
//         data,
//     })
// }

// export async function updateUser(id,data) {
//     return ApiService.fetchData({
//         url: '/user/'+id,
//         method: 'PUT',
//         data,
//     })
// }

// export async function updateClient(id,data) {
//     return ApiService.fetchData({
//         url: '/client/'+id,
//         method: 'PUT',
//         data,
//     })
// }

// export async function deleteClientAPI(id) {
//     return ApiService.fetchData({
//         url: '/client/'+id,
//         method: 'DELETE',
//     })
// }

// export async function deleteTaskAPI(id) {
//     return ApiService.fetchData({
//         url: '/task/'+id,
//         method: 'DELETE',
//     })
// }

// export async function deleteUserAPI(id) {
//     return ApiService.fetchData({
//         url: '/user/'+id,
//         method: 'DELETE',
//     })
// }
