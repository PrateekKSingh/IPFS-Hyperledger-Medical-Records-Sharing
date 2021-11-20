/* eslint-disable no-console */
'use strict'

import * as IPFS from 'ipfs-core'
import { create as ipfsClient } from 'ipfs-client'
//import ipfs_core  from './modules/IPFSInstance'
//import * as cors from 'cors'

 App = () => {
  //var corsOptions = {
  //  origin: ["/ip4/127.0.0.1/tcp/5002/http","/ip4/127.0.0.1/tcp/5003/ws"]
  //}
  //cors()

  ///let ipfs = ipfsClient({
  //  grpc: "/ip4/127.0.0.1/tcp/5003/ws",
  //  http: "/ip4/127.0.0.1/tcp/5002/http"
  //})

  let ipfs_core
  (async function() { ipfs_core =   await IPFS.create()})()
  
  //(async function() { await IPFSInstance()})()
  
     
  let user_cid_array = [] //Created by Prateek.Javascript array and local storage to be used in prototype until Blockchain is implemented
  let ownercid_ownerleafnodecid_map_array = [] //Created by Prateek.Javascript array and local storage to be used in prototype until Blockchain is implemented
  let creatorcid_creatorleafnodecid_map_array = [] //Created by Prateek.Javascript array and local storage to be used in prototype until Blockchain is implemented
  if (localStorage.getItem("user-cid-array")!=null){    //Created by Prateek.Javascript array and local storage to be used in prototype until Blockchain is implemented
    user_cid_array = JSON.parse(localStorage.getItem("user-cid-array"))
  }
  if (localStorage.getItem("ownercid-ownerleafnodecid-map-array")!=null){    //Created by Prateek.Javascript array and local storage to be used in prototype until Blockchain is implemented
    ownercid_ownerleafnodecid_map_array = JSON.parse(localStorage.getItem("ownercid-ownerleafnodecid-map-array"))
  }
  if (localStorage.getItem("creatorcid_creatorleafnodecid_map_array")!=null){    //Created by Prateek.Javascript array and local storage to be used in prototype until Blockchain is implemented
    creatorcid_creatorleafnodecid_map_array = JSON.parse(localStorage.getItem("creatorcid-creatorleafnodecid-map-array"))
  }
  
  //Created by Prateek. Blockchain read and write related functions start here. Currently implemented in the form of javascript arrays persisted with local storage.
  
  //Created by Prateek. Function to check whether a particular user is registered while login. 
  //Same function is used to check whether same hash is created for a user which already exists while registration. 
  //The chances are there for same has creation only if user input is same and random number generated is also same. But in that case
  //in case the user gives the same input but actually he is a different user, he should not be under impression that he has been registered
  //but should get message to try again. 
  const checkUserRegistration = (user_object_cid) => {
    var count = user_cid_array.length
    for (var i=0;i<count;i++)
    {
      if(
         user_cid_array[i].UserCID===user_object_cid
        ){return [
           user_cid_array[i].UserType,
           true]};
    }
    return ["Empty", false];
    }
  
  //Created by Prateek. Blockchain read and write related functions end here. Currently implemented in the form of javascript arrays.

  /*
  const COLORS = {
    active: '#357edd',
    success: '#0cb892',
    error: '#ea5037'
  }

  const scrollToBottom = () => {
    const terminal = document.getElementById('terminal')

    terminal.scroll({ top: terminal.scrollHeight, behavior: 'smooth' })
  }

  const showStatus = (text, bg) => {
    console.info(text)

    const log = document.getElementById('output')

    if (!log) {
      return

    }

    const line = document.createElement('p')
    line.innerText = text
    line.style.color = bg

    log.appendChild(line)

    scrollToBottom(log)
  }

  async function * streamFiles () {
    for (let i = 0; i < 100; i++) {
      await new Promise((resolve) => {
        setTimeout(() => resolve(), 100)
      })

      showStatus(`Sending /file-${i}.txt`, COLORS.active)

      yield {
        path: `/file-${i}.txt`,
        content: `file ${i}`
      }
    }
  }

  const connect = async (grpcApi, httpApi) => {
    showStatus(`Connecting to ${grpcApi} using ${httpApi} as fallback`, COLORS.active)

    ipfs = ipfsClient({
      grpc: grpcApi,
      http: httpApi
    })

    const id = await ipfs.id()                                                                                                                                                                                                                                                    
    showStatus(`Daemon active\nID: ${id.id}`, COLORS.success)

    for await (const file of ipfs.addAll(
      
      streamFiles(), {
      wrapWithDirectory: true,
      // this is just to show the interleaving of uploads and progress events
      // otherwise we'd have to upload 50 files before we see any response from
      // the server. do not specify this so low in production as you'll have
      // greatly degraded import performance
      fileImportConcurrency: 1,
      progress: (bytes, file) => {
        showStatus(`File progress ${file} ${bytes}`, COLORS.active)
      }
    })) {
      showStatus(`Added file: ${file.path} ${file.cid}`, COLORS.success)
    }

    showStatus('Finished!', COLORS.success)
  }

  // Event listeners
  document.getElementById('connect-submit').onclick = async (e) => {
    e.preventDefault()
    const grpc = document.getElementById('grpc-input').value
    const http = document.getElementById('http-input').value

    try {
      await connect(grpc, http)
      //ipfs_core = await IPFS.create() //Added by Prateek
      //const { cid } = await ipfs_core.add('Hello world') //Added by Prateek
      //console.info(cid) //Added by Prateek
    
    // QmXXY5ZxbtuYj6DnfApLiGstzPN7fvSyigrRee3hDWPCaf
    } catch (err) {
      showStatus(err.message, COLORS.error)
      console.error(err)
    }
  }
  */
 
  //COLRS object copied from the comment and being included
  const COLORS = {
    active: '#357edd',
    success: '#0cb892',
    error: '#ea5037'
  }

  //ShowStatus function copied from the comment and being included  
  const showStatus = (text, bg) => {
    console.info(text)

    const log = document.getElementById('login-user-output')

    if (!log) {
      return
    }

    const line = document.createElement('p')
    line.innerText = text
    line.style.color = bg

    log.appendChild(line)
  }

  //Added by Prateek for inserting general user object in IPFS on register general user button click starts here
  // Event listeners
  document.getElementById('register-general-user-submit').onclick = async (e) => {
    e.preventDefault()
    const gu_name = document.getElementById('general-user-name').value
    const gu_age = document.getElementById('general-user-age').value
    const gu_address = document.getElementById('general-user-address').value
    const gu_country = document.getElementById('general-user-country').value
    const gu_phonenumber = document.getElementById('general-user-phonenumber').value
    const gu_emailaddress = document.getElementById('general-user-emailaddress').value
    const gu_randomnumber = Math.random()
    try {
      //ipfs_core = await IPFS.create()
      const gu_object_cid  = await ipfs_core.dag.put({ GeneralUserName: gu_name, GeneralUserAge: gu_age, GeneralUserAddress: gu_address,
                                                          GeneralUserCountry: gu_country, GeneralUserPhoneNumber: gu_phonenumber, GeneralUserEmailAddress: gu_emailaddress,
                                                          GeneralUserRandomNumber: gu_randomnumber})  
      //Check whether CID generated already exists in javascript array which stores CIDs (later on this check will be on hyperledger fabric blockchain) starts here
      var userType, userCIDExists 
      [userType, userCIDExists] = checkUserRegistration(gu_object_cid.toString())
      console.info(userType, userCIDExists)
      //Check whether CID generated already exists in javascript array which stores CIDs (later on this check will be on hyperledger fabric blockchain) ends here
      if (userCIDExists === false)
      {
        document.getElementById('register-general-user-output').innerHTML = "<h3>" + gu_object_cid + "</h3>"
        user_cid_array.push({UserType: "G", UserCID: gu_object_cid.toString()}) //javascript array and local storage being used to persist data until blockchain is implemented
        console.info(user_cid_array)
        localStorage.setItem("user-cid-array", JSON.stringify(user_cid_array))  //javascript array and local storage being used to persist data until blockchain is implemented
        
      }
      else
        document.getElementById('register-general-user-output').innerHTML = "<h3>" + "Hash generated is same as an existing user. Please try again." + "</h3>" 
    } catch (err) {
      showStatus(err.message, COLORS.error)
      console.error(err)
    }
  }
  //Added by Prateek for inserting general user object in IPFS on register general user button click ends here

  //Added by Prateek for inserting hospital or laboratory object in IPFS on register hospital or laboratory button click starts here
  // Event listeners
  document.getElementById('register-hospital-or-laboratory-submit').onclick = async (e) => {
    e.preventDefault()
    const hl_name = document.getElementById('hospital-or-laboratory-name').value
    const hl_address = document.getElementById('hospital-or-laboratory-address').value
    const hl_phonenumber = document.getElementById('hospital-or-laboratory-phonenumber').value
    const hl_emailaddress = document.getElementById('hospital-or-laboratory-emailaddress').value
    const hl_randomnumber = Math.random()
    try {
      //ipfs_core = await IPFS.create()
      const hl_object_cid  = await ipfs_core.dag.put({ HospitalOrLaboratoryName: hl_name, HospitalOrLaboratoryAddress: hl_address,
                                                       HospitalOrLaboratoryPhoneNumber: hl_phonenumber, HospitalOrLaboratoryEmailAddress: hl_emailaddress,
                                                       HospitalOrLaboratoryRandomNumber: hl_randomnumber})  
      //Check whether CID generated already exists in javascript array which stores CIDs (later on this check will be on hyperledger fabric blockchain) starts here
      var userType, userCIDExists 
      [userType, userCIDExists] = checkUserRegistration(hl_object_cid.toString())
      console.info(userType, userCIDExists)
      //Check whether CID generated already exists in javascript array which stores CIDs (later on this check will be on hyperledger fabric blockchain) ends here
      if (userCIDExists === false)
      {
        document.getElementById('register-hoisptal-or-laboratory-output').innerHTML = "<h3>" + hl_object_cid + "</h3>"
        user_cid_array.push({UserType: "H", UserCID: hl_object_cid.toString()})  //javascript array and local storage being used to persist data until blockchain is implemented
        console.info(user_cid_array)
        localStorage.setItem("user-cid-array", JSON.stringify(user_cid_array))  //javascript array and local storage being used to persist data until blockchain is implemented    
      }
      else
        document.getElementById('register-hoisptal-or-laboratory-output').innerHTML = "<h3>" + "Hash generated is same as an existing user. Please try again." + "</h3>" 
    } catch (err) {
      showStatus(err.message, COLORS.error)
      console.error(err)
    }
  }
  //Added by Prateek for inserting hospital or laboratory object in IPFS on register hospital or laboratory button click ends here

  //Added by Prateek for inserting doctor object in IPFS on register doctor button click starts here
  // Event listeners
  document.getElementById('register-doctor-submit').onclick = async (e) => {
    e.preventDefault()
    const d_name = document.getElementById('doctor-name').value
    const d_speciality = document.getElementById('doctor-speciality').value
    const d_registrationnumber = document.getElementById('doctor-registrationnumber').value
    const d_randomnumber = Math.random()
    try {
      //ipfs_core = await IPFS.create()
      const d_object_cid  = await ipfs_core.dag.put({ DoctorName: d_name, DoctorSpeciality: d_speciality,
                                                       DoctorRegistrationNumber: d_registrationnumber, 
                                                       DoctorRandomNumber: d_randomnumber})  
      //Check whether CID generated already exists in javascript array which stores CIDs (later on this check will be on hyperledger fabric blockchain) starts here
      var userType, userCIDExists 
      [userType, userCIDExists] = checkUserRegistration(d_object_cid.toString())
      console.info(userType, userCIDExists)
      //Check whether CID generated already exists in javascript array which stores CIDs (later on this check will be on hyperledger fabric blockchain) ends here
      if (userCIDExists === false)
      {
        document.getElementById('register-doctor-output').innerHTML = "<h3>" + d_object_cid + "</h3>"
        user_cid_array.push({UserType: "D", UserCID: d_object_cid.toString()})  //javascript array and local storage being used to persist data until blockchain is implemented
        console.info(user_cid_array)
        localStorage.setItem("user-cid-array", JSON.stringify(user_cid_array))  //javascript array and local storage being used to persist data until blockchain is implemented    
      }
      else
        document.getElementById('register-doctor-output').innerHTML = "<h3>" + "Hash generated is same as an existing user. Please try again." + "</h3>" 
    } catch (err) {
      showStatus(err.message, COLORS.error)
      console.error(err)
    }
  }
  //Added by Prateek for inserting doctor object in IPFS on register doctor button click ends here

  //Added by Prateek for inserting insurance company object in IPFS on register insurance company button click starts here
  // Event listeners
  document.getElementById('register-insurancecompany-submit').onclick = async (e) => {
    e.preventDefault()
    const ic_name = document.getElementById('insurancecompany-name').value
    const ic_address = document.getElementById('insurancecompany-address').value
    const ic_phonenumber = document.getElementById('insurancecompany-phonenumber').value
    const ic_emailaddress = document.getElementById('insurancecompany-emailaddress').value
    const ic_randomnumber = Math.random()
    try {
      //ipfs_core = await IPFS.create()
      const ic_object_cid  = await ipfs_core.dag.put({ InsuranceCompanyName: ic_name, InsuranceCompanyAddress: ic_address,
                                                       InsuranceCompanyPhoneNumber: ic_phonenumber, InsuranceCompanyEmailAddress: ic_emailaddress, 
                                                       InsuranceCompanyRandomNumber: ic_randomnumber})  
      //Check whether CID generated already exists in javascript array which stores CIDs (later on this check will be on hyperledger fabric blockchain) starts here
      var userType, userCIDExists 
      [userType, userCIDExists] = checkUserRegistration(ic_object_cid.toString())
      console.info(userType, userCIDExists)
      //Check whether CID generated already exists in javascript array which stores CIDs (later on this check will be on hyperledger fabric blockchain) ends here
      if (userCIDExists === false)
      {
        document.getElementById('register-insurancecompany-output').innerHTML = "<h3>" + ic_object_cid + "</h3>"
        user_cid_array.push({UserType: "I", UserCID: ic_object_cid.toString()})  //javascript array and local storage being used to persist data until blockchain is implemented
        console.info(user_cid_array)
        localStorage.setItem("user-cid-array", JSON.stringify(user_cid_array))  //javascript array and local storage being used to persist data until blockchain is implemented    
      }
      else
        document.getElementById('register-insurancecompany-output').innerHTML = "<h3>" + "Hash generated is same as an existing user. Please try again." + "</h3>" 
    } catch (err) {
      showStatus(err.message, COLORS.error)
      console.error(err)
    }
  }
  //Added by Prateek for inserting insurance company object in IPFS on register insurance company button click ends here

  //Added by Prateek for logging in user on user login button click starts here
  // Event listeners
  document.getElementById('login-user-submit').onclick = async (e) => {
    e.preventDefault()
    try {
      const login_key = document.getElementById('login-key').value
      //Check whether CID entered already exists in javascript array which stores CIDs (later on this check will be on hyperledger fabric blockchain) starts here
      var userType, userCIDExists 
      [userType, userCIDExists] = checkUserRegistration(login_key)
      console.info(userType, userCIDExists)
      //Check whether CID entered already exists in javascript array which stores CIDs (later on this check will be on hyperledger fabric blockchain) ends here
      if (userCIDExists === false)
      {
        //Make any previously shown screen hidden
        document.getElementById('main-general-user-details').setAttribute("hidden","true")
        document.getElementById('main-hospital-or-laboratory-details').setAttribute("hidden","true")
        document.getElementById('main-doctor-details').setAttribute("hidden","true")
        document.getElementById('main-incurance-company-details').setAttribute("hidden","true")
        document.getElementById('login-user-output').innerHTML = "<h3>" + "No user registered with this key." + "</h3>"
      }
      else
      {
        switch (userType)
        {
          case "G":
            userType = "General User"
            mainId = "main-general-user-details"
            break;
          case "H":
            userType = "Hospital or Laboratory"
            mainId = "main-hospital-or-laboratory-details"
            break;
          case "D":
            userType = "Doctor"
            mainId = "main-doctor-details"
            break;
          case "I":
            userType = "Insurance Company"
            mainId = "main-incurance-company-details"
            break;
        }
        document.getElementById('login-user-output').innerHTML = "<h3>" + "User is of the type "+userType + ". Login is successful." + "</h3>"
        //Now hide all the screens and then show the corresponding screen. Hiding screens is necessary because on a single page the user can 
        //login twice and in that case if he logs in again a different user type, the initial screen which became visible should get hidden 
        document.getElementById('main-general-user-details').setAttribute("hidden","true")
        document.getElementById('main-hospital-or-laboratory-details').setAttribute("hidden","true")
        document.getElementById('main-doctor-details').setAttribute("hidden","true")
        document.getElementById('main-incurance-company-details').setAttribute("hidden","true")
        document.getElementById(mainId).removeAttribute("hidden")

        //Now another switch case to fetch values of corresponding user from IPFS based on his IPFS and to show these values on screen
        switch (userType)
        {
          case "General User":
            //Get data about the logged in user in different variables 
            g_user_name = await ipfs_core.dag.get(IPFS.CID.parse(login_key), {path: '/GeneralUserName'})
            g_user_age = await ipfs_core.dag.get(IPFS.CID.parse(login_key), {path: '/GeneralUserAge'})
            g_user_address = await ipfs_core.dag.get(IPFS.CID.parse(login_key), {path: '/GeneralUserAddress'})
            g_user_country = await ipfs_core.dag.get(IPFS.CID.parse(login_key), {path: '/GeneralUserCountry'})
            g_user_phonenumber = await ipfs_core.dag.get(IPFS.CID.parse(login_key), {path: '/GeneralUserPhoneNumber'})
            g_user_emailaddress = await ipfs_core.dag.get(IPFS.CID.parse(login_key), {path: '/GeneralUserEmailAddress'})
            //Bind the variables fethched with the input textboxes on screen
            document.getElementById('general-user-name-retrieved').value = g_user_name.value
            document.getElementById('general-user-age-retrieved').value = g_user_age.value
            document.getElementById('general-user-address-retrieved').value = g_user_address.value
            document.getElementById('general-user-country-retrieved').value = g_user_country.value
            document.getElementById('general-user-phonenumber-retrieved').value = g_user_phonenumber.value
            document.getElementById('general-user-emailaddress-retrieved').value = g_user_emailaddress.value
            break;
          case "Hospital or Laboratory":
            //Get data about the logged in user in different variables 
            h_or_l_name = await ipfs_core.dag.get(IPFS.CID.parse(login_key), {path: '/HospitalOrLaboratoryName'})
            h_or_l_address = await ipfs_core.dag.get(IPFS.CID.parse(login_key), {path: '/HospitalOrLaboratoryAddress'})
            h_or_l_phonenumber = await ipfs_core.dag.get(IPFS.CID.parse(login_key), {path: '/HospitalOrLaboratoryPhoneNumber'})
            h_or_l_emailaddress = await ipfs_core.dag.get(IPFS.CID.parse(login_key), {path: '/HospitalOrLaboratoryEmailAddress'})
            //Bind the variables fethched with the input textboxes on screen
            document.getElementById('hospital-or-laboratory-name-retrieved').value = h_or_l_name.value
            document.getElementById('hospital-or-laboratory-address-retrieved').value = h_or_l_address.value
            document.getElementById('hospital-or-laboratory-phonenumber-retrieved').value = h_or_l_phonenumber.value
            document.getElementById('hospital-or-laboratory-emailaddress-retrieved').value = h_or_l_emailaddress.value
            break;
          case "Doctor":
            //Get data about the logged in user in different variables 
            d_name = await ipfs_core.dag.get(IPFS.CID.parse(login_key), {path: '/DoctorName'})
            d_speciality = await ipfs_core.dag.get(IPFS.CID.parse(login_key), {path: '/DoctorSpeciality'})
            d_registrationnumber = await ipfs_core.dag.get(IPFS.CID.parse(login_key), {path: '/DoctorRegistrationNumber'})
            //Bind the variables fethched with the input textboxes on screen
            document.getElementById('doctor-name-retrieved').value = d_name.value
            document.getElementById('doctor-speciality-retrieved').value = d_speciality.value
            document.getElementById('doctor-registrationnumber-retrieved').value = d_registrationnumber.value
            break;
          case "Insurance Company":
            //Get data about the logged in user in different variables 
            ic_name = await ipfs_core.dag.get(IPFS.CID.parse(login_key), {path: '/InsuranceCompanyName'})
            ic_address = await ipfs_core.dag.get(IPFS.CID.parse(login_key), {path: '/InsuranceCompanyAddress'})
            ic_phonenumber = await ipfs_core.dag.get(IPFS.CID.parse(login_key), {path: '/InsuranceCompanyPhoneNumber'})
            ic_emailaddress = await ipfs_core.dag.get(IPFS.CID.parse(login_key), {path: '/InsuranceCompanyEmailAddress'})
            //Bind the variables fethched with the input textboxes on screen
            document.getElementById('insurance-company-name-retrieved').value = ic_name.value
            document.getElementById('insurance-company-address-retrieved').value = ic_address.value
            document.getElementById('insurance-company-phonenumber-retrieved').value = ic_phonenumber.value
            document.getElementById('insurance-company-emailaddress-retrieved').value = ic_emailaddress.value
            break;
        } 
      } 
    } catch (err) {
      showStatus(err.message, COLORS.error)
      //console.error(err)
    }
  }
  //Added by Prateek for logging in user on user login button click ends here
}

App()
