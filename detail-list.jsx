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
			"MJMLElement": "mjml-core",
			"React": "react",
			"Component": "react.Component",
			"Column": "mjml-column",
			"Detail": "bh-mj-detail",
			"Section": "mjml-section"
		}
	@end-include
*/

import { MJMLElement } from "mjml-core";
import React, { Component } from "react";
import Column from "mjml-column";
import Detail from "bh-mj-detail";
import Section from "mjml-section";
import Text from "mjml-text";
import Wrapper from "mjml-wrapper";

import doubt from "doubt";
import nbyx from "nbyx";
import parseon from "parseon";
import protype from "protype";
import sxty4 from "sxty4";

const tagName = "mj-detail-list";

const parentTag = [ "mj-container" ];

const endingTag = false;

const defaultMJMLDefinition = {
	"content": "",
	"attributes": {
		"list": [ {
			"title": "Title",
			"value": "Value"
		} ]
	},
};

@MJMLElement
class DetailList extends Component {
	render( ){
		const { mjAttribute, renderWrappedOutlookChildren } = this.props;

		let list = mjAttribute( "list" );

		if( protype( list, STRING ) ){
			try{
				list = parseon( sxty4( list ).decode( ) );

			}catch( error ){
				return ( <Section
							{ ...this.props }
						>
							<Column>
								{
									renderWrappedOutlookChildren( [
										<Text>
											{ "Sorry, there's something wrong with the details. Please report this immediately." }
										</Text>,
										<Text>
											{ `Error, ${ sxty4( error.stack ).encode( ) }` }
										</Text>,
										<Text>
											{ `Timestamp, ${ Date.now( ) }` }
										</Text>
									] )
								}
							</Column>
						</Section> );
			}
		}

		if( !doubt( list, ARRAY ) ){
			return ( <Section
						{ ...this.props }
					>
						<Column>
							<Text>
								{ "Sorry, there's no details to be shown" }
							</Text>
						</Column>
					</Section> );
		}

		list = nbyx( list, 3 );

		return ( <Wrapper
					{ ...this.props }
					padding="0px 0px 0px 0px"
					full-width="full-width"
				>
					{
						renderWrappedOutlookChildren( list.map( function onEachRow( row, index ){
							return ( <Section
										key={ `row-${ index }` }
										padding="0px 0px 0px 0px"
									>
										{
											renderWrappedOutlookChildren( row.map( function onEachDetail( detail, index ){
												return ( <Detail
															{ ...detail }
															key={ `detail-${ index }` }
														>
														</Detail> );
											} ) )
										}
									</Section> );
						} ) )
					}
				</Wrapper> );
	}
}

DetailList.tagName = tagName;
DetailList.parentTag = parentTag;
DetailList.endingTag = endingTag;
DetailList.defaultMJMLDefinition = defaultMJMLDefinition;

export default DetailList;
