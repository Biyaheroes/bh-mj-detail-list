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
			"package": "detail-list",
			"path": "detail-list/detail-list.jsx",
			"file": "detail-list.jsx",
			"module": "detail-list",
			"author": "Biyaheroes Developers",
			"contributors": [
				"Robot Biyaheroes <robot@biyaheroes.com>",
				"Richeve S. Bebedor <richeve.bebedor@gmail.com>"
			],
			"eMail": "developers@biyaheroes.com",
			"repository": "https://github.com/Biyaheroes/bh-mj-detail-list.git",
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

//: @ignore:
import "./detail-list.scss";
//: @end-ignore

import $ from "jquery";
import React, { PureComponent } from "react";
import ReactDOM from "react-dom";

import { MJMLElement } from "mjml-core";

import Column from "mjml-column";
import Section from "mjml-section";
import Text from "mjml-text";
import Wrapper from "mjml-wrapper";

import Detail from "bh-mj-detail";
import Issue from "bh-mj-issue";
import Prompt from "bh-mj-prompt";

import arid from "arid";
import doubt from "doubt";
import filpos from "filpos";
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
		"name": "",
		"count": 3,
		"list": [ ],
		"align": "left",
		"background-color": "white",
		"foreground-color": "black"
	},
};

@MJMLElement
class DetailList extends PureComponent {
	resolve( property ){
		const { mjAttribute } = this.props;

		let {
			name,
			list, count,
			align, backgroundColor, foregroundColor
		} = this.props;

		align = wichevr( align, mjAttribute( "align" ) );
		backgroundColor = wichevr( backgroundColor, mjAttribute( "background-color" ) );
		foregroundColor = wichevr( foregroundColor, mjAttribute( "foreground-color" ) );

		list = wichis( list, mjAttribute( "list" ) );

		if( typeof list == "string" ){
			try{
				list = parseon( sxty4( list ).decode( ) );

			}catch( error ){
				return {
					"name": name,
					"error": error
				};
			}
		}

		if( arid( list ) ){
			return {
				"name": name,
				"prompt": "Sorry, there are no details to be shown."
			};
		}

		if( doubt( list ) ){
			return {
				"name": name,
				"prompt": "Invalid details."
			};
		}

		list = nbyx( list.map( ( item ) => {
			if( typeof item == "object" ){
				item.align = wichevr( item.align, align );
				item.backgroundColor = wichevr( item.backgroundColor, backgroundColor );
				item.foregroundColor = wichevr( item.foregroundColor, foregroundColor );
			}
			return item;
		} ), count ).map( ( row ) => {
			return filpos( row, 3, { "title": "", "label": "", "value": "" } )
		} );

		try{
			count = parseInt( count || mjAttribute( "count" ) );

		}catch( error ){
			count = 3;
		}

		return {
			"name": name,
			"list": list,
			"count": count
		};
	}

	componentWillMount( ){
		this.setState( { "data": this.resolve( this.props ) } );
	}

	componentWillReceiveProps( property ){
		this.setState( { "data": this.resolve( property ) } );
	}

	render( ){
		let { name, list, count, error, prompt } = this.state.data;

		if( error instanceof Error ){
			return (
				<Issue
					name={ name }
					error={ error }
					message="Sorry, there's something wrong with the details. Please report this immediately."
				>
				</Issue>
			);
		}

		if( prompt ){
			return (
				<Prompt
					name={ name }
					message={ prompt }
					background-color="#c4322f"
					foreground-color="white"
					side-color="#be1c18"
				>
				</Prompt>
			);
		}

		return (
			<Wrapper
				{ ...this.props }
				padding="0px 0px 0px 0px"
				full-width="full-width"
			>
				{
					list.map( function onEachRow( row, index ){
						return (
							<Section
								key={ `row-${ index }` }
								padding="0px 0px 0px 0px"
							>
									{
										row.map( function onEachDetail( detail, index ){
											return (
												<Detail
													{ ...detail }
													key={ `detail-${ index }` }
													count={ 3 }
												>
												</Detail>
											);
										} )
									}
							</Section>
						);
					} )
				}
			</Wrapper>
		);
	}

	componentDidMount( ){
		$( ReactDOM.findDOMNode( this ) )
			.addClass( "bh-mj-detail-list" )
			.addClass( this.state.data.name )
			.append( `
				<link
					class="bh-mj-detail-list style"
					rel="stylesheet"
					type="text/css"
					href="https://unpkg.com/bh-mj-detail-list/detail-list.css"
				/>
			` );
	}

	componentWillUnmount( ){
		$( ".bh-mj-detail-list.style" ).remove( );
	}
}

DetailList.tagName = tagName;
DetailList.parentTag = parentTag;
DetailList.endingTag = endingTag;
DetailList.defaultMJMLDefinition = defaultMJMLDefinition;

export default DetailList;
