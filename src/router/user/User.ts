import express = require('express');
import bcrypt = require('bcryptjs');
import User, { user, signInUser, signUpUser } from '../../models/User';