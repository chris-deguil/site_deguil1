#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Aug 17 18:35:42 2025

@author: christophe
"""

def somme(n_max):
	u=3
	S=u
	for i in range(1,n_max+1):
		u=u-i+2
		S=S+u
	return S