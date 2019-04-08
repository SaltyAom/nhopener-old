import React, { Component, useState, useReducer, useContext, useEffect } from 'react'
import { NavLink, Link, Redirect } from 'react-router-dom'
import store from './store/redux-store'
import Loadable from 'react-loadable'
import Loading from './component/loading'
import ButtonBase from '@material-ui/core/ButtonBase'

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
    store, 
    Loadable, 
    Loading, 
    ButtonBase, 
}