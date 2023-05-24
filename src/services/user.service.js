import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "../common/Constants";

const getUserStats = () => {
  return axios.get(API_URL + "getUserStats", { headers: authHeader() })
}

const getServiceInfo = (serviceId) => {
  return axios.get(API_URL + "getServiceInfo", {
    headers: authHeader(), params: {
      serviceId: serviceId
    }
  })
}

const getAllUsers = () => {
  return axios.get(API_URL + "getAllUsers", { headers: authHeader() })
}

const changeUserRole = (newRoleAndId) => {
  return axios.post(API_URL + "changeUserRole", newRoleAndId, { headers: authHeader() })
}

const addNewUser = (newUserData) => {
  return axios.post(API_URL + "addNewUser", newUserData, { headers: authHeader() })
}

const getAllServices = () => {
  return axios.get(API_URL + "getAllServices", { headers: authHeader() })
}

const getAllUsernames = () => {
  return axios.get(API_URL + "getAllUsernames", { headers: authHeader() })
}

const getAllModerators = () => {
  return axios.get(API_URL + "getAllModerators", { headers: authHeader() })
}

const addNewService = (newServiceData) => {
  return axios.post(API_URL + "addNewService", newServiceData, { headers: authHeader() })
}

const addNote = (newNoteData) => {
  return axios.post(API_URL + "addNote", newNoteData, { headers: authHeader() })
}

const addTrack = (newTrackPointData) => {
  return axios.post(API_URL + "addTrack", newTrackPointData, { headers: authHeader() })
}

const editTrackStatus = (updatedTrackPoint) => {
  return axios.post(API_URL + "editTrackStatus", updatedTrackPoint, { headers: authHeader() })
}

const userService = {
  getUserStats,
  getServiceInfo,
  getAllUsers,
  changeUserRole,
  addNewUser,
  getAllServices,
  getAllUsernames,
  getAllModerators,
  addNewService,
  addNote,
  addTrack,
  editTrackStatus,
};

export default userService