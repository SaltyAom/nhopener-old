import React, { Component, useState, useReducer, useContext, useEffect } from 'react'
import { NavLink, Link, Redirect } from 'react-router-dom'
import Loadable from 'react-loadable'
import Loading from './component/loading'
import ButtonBase from '@material-ui/core/ButtonBase'
import Axios from 'axios'
import openerIDB from './store/dexie-indexeddb'
import LazyLoad from 'react-lazy-load'

const storeContext:any = React.createContext<null>(null)

export { 
    React, 
    Component, 
    useState,
    useEffect,
    useReducer,
    useContext,
    storeContext,
    NavLink, 
    Link, 
    Redirect, 
    Loadable, 
    Loading, 
    ButtonBase,
    Axios,
    openerIDB,
    LazyLoad
}