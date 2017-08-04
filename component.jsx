"use strict";

import React from "react";
import ReactDOM from "react-dom";

import DetailList from "./detail-list.module.jsx";

ReactDOM.render(
	<DetailList
		list={
			[
				{
					"title":"Hello",
					"value":"world"
				},
				{
					"title":"Hello",
					"value":"world"
				},
				{
					"title":"Lorem Ipsum",
					"value":"Hello World"
				},
				{
					"title":"Hola Amigo",
					"value":"Hello World Yeah"
				}
			]
		}
	>
	</DetailList>,

	document.getElementById( "root" )
);
