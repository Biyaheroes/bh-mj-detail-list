"use strict";

/*;
	@module-license:
		The MIT License (MIT)
		@mit-license

		Copyright (@c) 2017 Biyaheroes Developers
		@email: developers@biyaheroes.com

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-module-license

	@module-configuration:
		{
			"package": "detail",
			"path": "detail/detail.jsx",
			"file": "detail.jsx",
			"module": "detail",
			"author": "Biyaheroes Developers",
			"contributors": [
				"Robot Biyaheroes <robot@biyaheroes.com>",
				"Richeve S. Bebedor <richeve.bebedor@gmail.com>"
			],
			"eMail": "developers@biyaheroes.com",
			"repository": "https://github.com/Biyaheroes/bh-mj-detail.git",
			"global": true
		}
	@end-module-configuration

	@module-documentation:
		Biyaheroes MJML Detail List Component.
	@end-module-documentation

	@include:
		{
			"arid": "arid",
			"booleanize": "booleanize",
			"Component": "react.Component",
			"Column": "mjml-column",
			"Detail": "bh-mj-detail",
			"doubt": "doubt",
			"filpos": "filpos",
			"Issue": "bh-mj-issue",
			"MJMLElement": "mjml-core",
			"nbyx": "nbyx",
			"parseon": "parseon",
			"Prompt": "bh-mj-prompt",
			"React": "react",
			"Section": "mjml-section",
			"sxty4": "sxty4",
			"Wrapper": "mjml-wrapper",
			"wichevr": "wichevr"
		}
	@end-include
*/

import React, { Component } from "react";

import { MJMLElement } from "mjml-core";

import Section from "mjml-section";
import Wrapper from "mjml-wrapper";

import Detail from "bh-mj-detail";
import Issue from "bh-mj-issue";
import Prompt from "bh-mj-prompt";

import arid from "arid";
import booleanize from "booleanize";
import doubt from "doubt";
import filpos from "filpos";
import nbyx from "nbyx";
import parseon from "parseon";
import sxty4 from "sxty4";
import wichevr from "wichevr";

const tagName = "mj-detail-list";

const parentTag = [ "mj-container" ];

const endingTag = false;

const defaultMJMLDefinition = {
	"content": "",
	"attributes": {
		"list": [ ],
		"count": 3,
		"align": "left",
		"reverse": false,
		"background-color": "white",
		"foreground-color": "black"
	},
};

@MJMLElement
class DetailList extends Component {
	render( ){
		const { mjAttribute } = this.props;

		let { list, count, align, reverse, backgroundColor, foregroundColor } = this.props;

		list = wichevr( list, mjAttribute( "list" ) );

		if( typeof list == "string" ){
			try{
				list = parseon( sxty4( list ).decode( ) );

			}catch( error ){
				return ( <Issue error={ error }></Issue> )
			}
		}

		if( !doubt( list, ARRAY ) || arid( list ) ){
			return ( <Prompt
						message="Sorry, there's no detail list to be shown"
						backgroundColor="#227ee5"
						foregroundColor="white"
						sideColor="#1758a0"
					>
					</Prompt> );
		}

		try{
			count = parseInt( wichevr( count, mjAttribute( "count" ) ) );

		}catch( error ){
			count = 3;
		}

		list = nbyx( list, count ).map( ( row ) => filpos( row, 3, { "title": "", "label": "", "value": "" } ) );

		align = wichevr( align, mjAttribute( "align" ) );

		reverse = booleanize( wichevr( reverse, mjAttribute( "reverse" ) ) );

		backgroundColor = wichevr( backgroundColor, mjAttribute( "background-color" ) );

		foregroundColor = wichevr( foregroundColor, mjAttribute( "foreground-color" ) );

		return ( <Wrapper
					{ ...this.props }
				>
					{
						list.map( function onEachRow( row, index ){
							return ( <Section
										key={ `detail-row-${ index }` }
										full-width="full-width"
										padding="0px 0px 0px 0px"
									>
										{
											row.map( function onEachDetail( detail, index ){
												return ( <Detail
															key={ `detail-${ index }` }
															title={ detail.title }
															label={ detail.label }
															value={ detail.value }
															count={ count }
															align={ wichevr( detail.align, align ) }
															reverse={ wichevr( detail.reverse, reverse ) }
															backgroundColor={ wichevr( detail.backgroundColor, backgroundColor ) }
															foregroundColor={ wichevr( detail.foregroundColor, foregroundColor ) }
														>
														</Detail> );
											} )
										}
									</Section> );
						} )
					}
				</Wrapper> );
	}
}

DetailList.tagName = tagName;
DetailList.parentTag = parentTag;
DetailList.endingTag = endingTag;
DetailList.defaultMJMLDefinition = defaultMJMLDefinition;

export default DetailList;
