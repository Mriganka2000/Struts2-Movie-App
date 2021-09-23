/**
 * 
@author Mriganka Bhadra
 */

var states = Ext.create('Ext.data.Store', {
    fields: ['abbr', 'name'],
    data: [
        { "name": "English" },
        { "name": "Hindi" },
        { "name": "Bengali" }
    ],
    proxy: {
        type: 'memory',
        resder: {
            type: 'json',
            rootProperty: 'item',
        }
    }
});

var rating = Ext.create('Ext.data.Store', {
    fields: ['abbr', 'name'],
    data: [
        [ 1, "1" ],
        [ 2, "2" ],
        [ 3, "3" ],
		[ 4, "4" ],
		[ 5, "5" ]
    ],
    proxy: {
        type: 'memory',
        resder: {
            type: 'json',
            rootProperty: 'item',
        }
    }
});

var features = Ext.create('Ext.data.Store', {
    fields: ['abbr', 'name'],
    data: [
        { "name": "Trailers" },
        { "name": "Commentaries" },
        { "name": "Deleted Scenes" },
		{ "name": "Behind the Scenes" }
    ],
    proxy: {
        type: 'memory',
        resder: {
            type: 'json',
            rootProperty: 'item',
        }
    }
});

Ext.define('Movie', {
    extend: 'Ext.data.Model',
    fields: ['id', 'title', 'description', 'releaseYear', 'languageId', 'director', 'rating', 'specialFeature']
});

var movieStore = Ext.create('Ext.data.Store', {
    model: 'Movie',
    pageSize: 10,
	autoLoad: {
        params: {
            start: 0,
            limit: 10
        }
    },
    /*data: [
        { title: 'Hello World', description: 'Very Good is Movie Hello World', releaseYear: '2021-02-21', languageId: 'English', director: 'John Doe', rating: 'PG', specialFeature: 'Good Movie' },
        { title: 'Hello World', description: 'Very Good is Movie Hello World', releaseYear: '2021-02-20', languageId: 'English', director: 'John Doe', rating: 'PG', specialFeature: 'Good Movie' },
        { title: 'Hello World', description: 'Very Good is Movie Hello World', releaseYear: '2021-02-19', languageId: 'English', director: 'John Doe', rating: 'PG', specialFeature: 'Good Movie' },
        { title: 'Hello World', description: 'Very Good is Movie Hello World', releaseYear: '2021-02-18', languageId: 'English', director: 'John Doe', rating: 'PG', specialFeature: 'Good Movie' },
        { title: 'Hello World', description: 'Very Good is Movie Hello World', releaseYear: '2021-02-17', languageId: 'English', director: 'John Doe', rating: 'PG', specialFeature: 'Good Movie' },
        { title: 'Hello World', description: 'Very Good is Movie Hello World', releaseYear: '2021-02-16', languageId: 'English', director: 'John Doe', rating: 'PG', specialFeature: 'Good Movie' },
        { title: 'Hello World', description: 'Very Good is Movie Hello World', releaseYear: '2021-02-15', languageId: 'English', director: 'John Doe', rating: 'PG', specialFeature: 'Good Movie' },
        { title :'Hello World', description: 'Very Good is Movie Hello World', releaseYear: '2021-02-14', languageId: 'English', director: 'John Doe', rating: 'PG', specialFeature: 'Good Movie' },
        { title :'Hello World', description: 'Very Good is Movie Hello World', releaseYear: '2021-02-13', languageId: 'English', director: 'John Doe', rating: 'PG', specialFeature: 'Good Movie'}
    ],*/
	proxy: {
        type: 'ajax',
		enablePaging: true,
        url : 'http://localhost:8080/Struts2FirstProject/getMovies.action',
		reader: {
            type: 'json',
            rootProperty: 'items',
			enablePaging: true,
			reader: {
				type: 'json',
				rootProperty: 'items',
			}
        },
		autoLoad: {
	        params: {
	            start: 0,
	            limit: 10
	        }
	    }
    }
});

var searchStore = Ext.create('Ext.data.Store', {
	model: 'Movie',
	autoLoad: false,
    storeId: 'searchStore',
    proxy: 'memory'
});

/*movieStore.load();*/

Ext.onReady(function() {
	Ext.create('Ext.panel.Panel', {
	    title: 'Movie Advance Search',
	    bodyStyle: 'height:100%; width:100%; overflow:hidden;',
	    items: [{
	        xtype: 'form',
	        height: 250,
	        layout: 'column',
	        items: [{
	            xtype: 'panel',
	            height: 400,
	            columnWidth: 0.5,
				frame : false,
				border: false,
	            bodyStyle: 'padding-left: 20%; padding-top: 10%; background-color: transparent;',
	            items: [{
	                xtype: 'textfield',
	                fieldLabel: 'Movie Name',
					name: 'title'
	            }, {
	                xtype: 'numberfield',
	                fieldLabel: 'Release Year',
					name: 'year'
	            }]
	        }, {
	            xtype: 'panel',
	            height: 400,
	            columnWidth: 0.5,
				frame : false,
				border: false,
	            bodyStyle: 'padding-left: 20%; padding-top: 10%',
	            items: [{
	                xtype: 'textfield',
	                fieldLabel: 'Director Name',
					name: 'director'
	            }, {
	                xtype: 'combobox',
	                fieldLabel: 'languageId',
	                store: states,
	                queryMode: 'local',
	                displayField: 'name',
	                valueField: 'name',
					name: 'languageId'
	            }]
	        }],
	        buttons: [{
	            reference: 'searchBtn',
	            text: 'Search',
	            handler: function () {
					var form = this.up('form');
					var title = form.getForm().findField('title').getSubmitValue();
					var director = form.getForm().findField('director').getSubmitValue();
					var languageId = form.getForm().findField('languageId').getSubmitValue();
					Ext.Ajax.request({
			            url: 'http://localhost:8080/Struts2FirstProject/search.action',
			            method: "post",
			            params: {
			                'title': title,
							'director': director,
							'languageId': languageId,
			            },
			            success: function (response) {
							var data = Ext.decode(response.responseText)
        					Ext.StoreManager.lookup('searchStore').loadData(data);
							var win = Ext.create('Ext.window.Window', {
							    title: 'Hello',
							    height: 400,
							    width: 1000,
							    layout: 'fit',
							    items: {  // Let's put an empty grid in just to illustrate fit layout
							        xtype: 'grid',
							        border: false,
									store: searchStore,
							        columns: [
										{ text: 'Title', dataIndex: 'title', flex: 0.5 },
						                { text: 'Description', dataIndex: 'description', flex: 1 },
						                { text: 'Release Year', dataIndex: 'releaseYear', flex: 0.5 },
						                { text: 'languageId', dataIndex: 'languageId', flex: 0.5 },
						                { text: 'Director', dataIndex: 'director', flex: 0.5 },
						                { text: 'Rating', dataIndex: 'rating', flex: 0.5 },
						                { text: 'Special Feature', dataIndex: 'specialFeature', flex: 0.5 }
									]
							    },
								buttons: [{
						            reference: 'cancelBtn',
						            text: 'Cancel',
						            handler: function () {
										win.hide();
									}
						        }],
								buttonAlign: 'center',
							}).show();
			            },
						failure: function(form, action) {
                            Ext.Msg.alert('Failed', 'Failed to search');
                        }
			        });
	            }
	        }, {
	            reference: 'resetBtn',
	            text: 'Reset',
	            handler: function () {
	                var form = this.up('form');
					form.getForm().reset();
	            }
	        }],
	        buttonAlign: 'center',
	    }, {
	        xtype: 'panel',
	        title: 'Movie Grid',
	        layout: 'fit',
	        items: [{
	            xtype: 'grid',
	            height: 350,
				id: 'movieGrid',
	            store: movieStore,
	            dockedItems: [{
	                xtype: 'pagingtoolbar',
	                pageSize: 10,
	                displayMsg: 'Displaying topics {0} - {1} of {2}',
	                emptyMsg: "No topics to display",
	                store: movieStore,
	                dock: 'top',
	                displayInfo: true,
	                items: [
	                    {
	                        xtype: 'button',
							dock: 'right',
	                        text: 'Add',
	                        itemId: 'add',
	                        iconCls: 'add',
							handler: function(){
								var win = Ext.create('Ext.window.Window', {
								    title: 'Add Movie',
								    height: 440,
								    width: 400,
								    layout: 'fit',
								    items: {  // Let's put an empty grid in just to illustrate fit layout
								        xtype:'form',
										url: 'http://localhost:8080/Struts2FirstProject/add.action',
										height: 200,
										bodyStyle: 'padding-left: 10px; padding-top: 10px',
										defaults: {
									        width: '95%'
									    },
										items: [{
											xtype: 'textfield',
	                						fieldLabel: 'Title',
											name: 'title',
											allowBlank: false
										}, {
											xtype: 'numberfield',
	                						fieldLabel: 'Release Year',
											name: 'datefield',
											maxValue: 2021,
											allowBlank: false
										}, {
											xtype: 'combobox',
							                fieldLabel: 'Special Features',
							                store: features,
							                /*margin: 5*/
							                queryMode: 'local',
							                displayField: 'name',
							                valueField: 'name',
											name: 'specialfeatures',
											allowBlank: false
										}, {
											xtype: 'combobox',
							                fieldLabel: 'Rating',
							                store: rating,
							                /*margin: 5,*/
							                queryMode: 'local',
							                displayField: 'name',
							                valueField: 'name',
											name: 'rating',
											allowBlank: false
										}, {
											xtype: 'combobox',
							                fieldLabel: 'languageId',
							                store: states,
							                /*margin: 5,*/
							                queryMode: 'local',
							                displayField: 'name',
							                valueField: 'name',
											name: 'languageId',
											allowBlank: false
										}, {
											xtype: 'textfield',
											fieldLabel: 'Director Name',
											name: 'director',
											allowBlank: false
										}, {
											xtype     : 'textareafield',
									        grow      : true,
									        name      : 'description',
									        fieldLabel: 'Description',
											allowBlank: false
										}],
										buttons: [{
								            reference: 'saveBtn',
								            text: 'Save',
								            handler: function (btn) {
								                // Ext.Msg.alert('Submit', 'Your data is being saved');
												var win = btn.up('window');
	                                            var form = win.down('form');
	                                            // console.log(form.getForm().getValues());
	                                            var title = form.getForm().findField('title').getSubmitValue();
												var releaseYear = form.getForm().findField('datefield').getSubmitValue();
												var specialFeatures = form.getForm().findField('specialfeatures').getSubmitValue();
												var rating = form.getForm().findField('rating').getSubmitValue();
												var languageId = form.getForm().findField('languageId').getSubmitValue();
												var director = form.getForm().findField('director').getSubmitValue();
												var description = form.getForm().findField('description').getSubmitValue();
												//var form = this.up('form');
	                                            /*if (form.isValid()) {
	                                                form.submit({
	                                                    success: function(form, action) {
	                                                      Ext.Msg.alert('Success', 'Your data is being saved');
	                                                      // console.log(form.params);
														  //console.log(form.getForm().getValues());
	                                                    },
	                                                    failure: function(form, action) {
	                                                        Ext.Msg.alert('Failed', 'Failed to store data');
	                                                    }
	                                                });
	                                            } else {
	                                                Ext.Msg.alert( "Error!", "Your form is invalid!" );
	                                            }*/
												Ext.Ajax.request({
										            url: 'http://localhost:8080/Struts2FirstProject/add.action',
										            method: "post",
										            params: {
										                'title': title,
														'releaseYear': releaseYear,
														'specialFeatures': specialFeatures,
														'rating': rating,
														'languageId': languageId,
														'director': director,
														'description': description
										            },
										            success: function (response) {
										                Ext.Msg.alert('Success', 'Your data is being saved');
														window.location.reload();
										            },
													failure: function(form, action) {
														window.location.reload();
                                                        //Ext.Msg.alert('Failed', 'Failed to store data');
                                                    }
										        });
												win.hide();
								            }
								        }, {
								            reference: 'cancelBtn',
								            text: 'Cancel',
								            handler: function () {
								                Ext.Msg.alert('Submit', 'Request Cancelled');
												win.hide();
								            }
								        }],
								        buttonAlign: 'center',
								    }
								}).show();
								/*Ext.Msg.alert('Submit', `Your add is being processed`);*/
							}
	                    },
	                    {
	                        xtype: 'button',
							dock: 'right',
	                        text: 'Edit',
	                        itemId: 'edit',
	                        iconCls: 'edit',
							handler: function() {
								var selection = Ext.getCmp('movieGrid').getSelection();
					            if(selection.length){
									let id = '';
									let title = '';
									let releaseYear = '';
									let specialFeatures = '';
									let rating = 5;
									let languageId = '';
									let director = '';
									let description = '';
					                selection.map(item=>{
					                    id+=item.get('id');
					                });
									selection.map(item=>{
					                    title+=item.get('title');
					                });
									selection.map(item=>{
					                    description+=item.get('description');
					                });
									selection.map(item=>{
					                    specialFeatures+=item.get('specialFeatures');
					                });
									selection.map(item=>{
					                    releaseYear+=item.get('releaseYear');
					                });
									/*selection.map(item=>{
					                    rating+=item.get('rating');
					                });*/
									selection.map(item=>{
					                    languageId+=item.get('languageId');
					                });
									selection.map(item=>{
					                    director+=item.get('director');
					                });
									// console.log(id);
					                // Ext.Msg.alert('Selected Record',name);
									var win = Ext.create('Ext.window.Window', {
									    title: 'Update Movie',
									    height: 490,
									    width: 400,
									    layout: 'fit',
									    items: {  // Let's put an empty grid in just to illustrate fit layout
									        xtype:'form',
											url: 'http://localhost:8080/Struts2FirstProject/update.action',
											height: 200,
											bodyStyle: 'padding-left: 10px; padding-top: 10px',
											defaults: {
										        width: '95%'
										    },
											items: [{
												xtype: 'textfield',
		                						fieldLabel: 'Choosen ID',
												name: 'id',
												readOnly: true,
												allowBlank: false,
												value: id
											}, {
												xtype: 'textfield',
		                						fieldLabel: 'Title',
												name: 'title',
												allowBlank: false,
												value: title
											}, {
												xtype: 'numberfield',
		                						fieldLabel: 'Release Year',
												name: 'datefield',
												maxValue: 2021,
												allowBlank: false,
												value: releaseYear
											}, {
												xtype: 'combobox',
								                fieldLabel: 'Special Features',
								                store: features,
								                /*margin: 5*/
								                queryMode: 'local',
								                displayField: 'name',
								                valueField: 'name',
												name: 'specialfeatures',
												allowBlank: false,
												value: specialFeatures
											}, {
												xtype: 'combobox',
								                fieldLabel: 'Rating',
								                store: new Ext.data.SimpleStore({
									                data: [
												        [ 1, "1" ],
												        [ 2, "2" ],
												        [ 3, "3" ],
														[ 4, "4" ],
														[ 5, "5" ]
												    ],
									                id: 0,
									                fields: ['value', 'text'],
												}),
								                /*margin: 5,*/
								                queryMode: 'local',
								                displayField: 'text',
								                valueField: 'value',
												name: 'rating',
												allowBlank: false,
												value: rating
											}, {
												xtype: 'combobox',
								                fieldLabel: 'languageId',
								                store: states,
								                /*margin: 5,*/
								                queryMode: 'local',
								                displayField: 'name',
								                valueField: 'name',
												name: 'languageId',
												allowBlank: false,
												value: languageId
											}, {
												xtype: 'textfield',
												fieldLabel: 'Director Name',
												name: 'director',
												allowBlank: false,
												value: director
											}, {
												xtype     : 'textareafield',
										        grow      : true,
										        name      : 'description',
										        fieldLabel: 'Description',
												allowBlank: false,
												value: description
											}],
											buttons: [{
									            reference: 'updateBtn',
									            text: 'Update',
									            handler: function (btn) {
													var win = btn.up('window');
		                                            var form = win.down('form');
		                                            // console.log(form.getForm().getValues());
													var id = form.getForm().findField('id').getSubmitValue();
		                                            var title = form.getForm().findField('title').getSubmitValue();
													var releaseYear = form.getForm().findField('datefield').getSubmitValue();
													var specialFeatures = form.getForm().findField('specialfeatures').getSubmitValue();
													var rating = form.getForm().findField('rating').getSubmitValue();
													var languageId = form.getForm().findField('languageId').getSubmitValue();
													var director = form.getForm().findField('director').getSubmitValue();
													var description = form.getForm().findField('description').getSubmitValue();
													
													Ext.Ajax.request({
											            url: 'http://localhost:8080/Struts2FirstProject/update.action',
											            method: "post",
											            params: {
															'id': id,
											                'title': title,
															'releaseYear': releaseYear,
															'specialFeatures': specialFeatures,
															'rating': rating,
															'languageId': languageId,
															'director': director,
															'description': description
											            },
											            success: function (response) {
											                Ext.Msg.alert('Success', 'Your data is being updated');
															window.location.reload();
											            },
														failure: function(form, action) {
															window.location.reload();
															//grid.getStore().reload();
	                                                        //Ext.Msg.alert('Failed', 'Failed to update data');
	                                                    }
											        });
													win.hide();
									            }
									        }, {
									            reference: 'cancelBtn',
									            text: 'Cancel',
									            handler: function () {
									                Ext.Msg.alert('Submit', 'Request Cancelled');
													win.hide();
									            }
									        }],
									        buttonAlign: 'center',
									    }
									}).show();
										
					            } else {
					                Ext.Msg.alert('Error','Please select record');
					            }
							}
	                    },
	                    {
	                        xtype: 'button',
							dock: 'right',
	                        text: 'Delete',
	                        itemId: 'delete',
	                        iconCls: 'delete',
							handler:function(){
					            var selection = Ext.getCmp('movieGrid').getSelection();
					            if(selection.length){
					                let arr = [];
					                selection.map(item=>{
					                    arr.push(item.get('id'));
					                });
					                console.log(arr);
									Ext.Ajax.request({
							            url: 'http://localhost:8080/Struts2FirstProject/delete.action',
							            method: "post",
							            params: {
							                'checkBox': arr,
							            },
							            success: function (response) {
							                 Ext.toast('Data Deleted successfully');
							            },
										failure: function(form, action) {
											window.location.reload();
                                            //Ext.Msg.alert('Failed', 'Failed to store data');
                                        }
							        });
					            }else{
					                Ext.Msg.alert('Error','Please select record');
					            }
					        }
	                    }
	                ],
					listeners:{

	                    change : function( paging, pageData, options ){
							var page = pageData.currentPage;
	                        console.log(movieStore.currentPage, pageData.currentPage); 
							Ext.Ajax.request({
					            url: 'http://localhost:8080/Summer_Internship_Backend/paginate',
					            method: "post",
					            params: {
					                'page': page,
									'total': 5
					            },
					            success: function (response) {
					                
					            }
					        });   
	                    }
	                }
	            }],
	            selModel: {
	                checkOnly: false,
	                injectCheckbox: 'first',
	                mode: 'SIMPLE'
	            },
	            selType: 'checkboxmodel',
	            columns: [
	                { text: 'Title', dataIndex: 'title', flex: 0.5 },
	                { text: 'Description', dataIndex: 'description', flex: 1 },
	                { text: 'Release Year', dataIndex: 'releaseYear', flex: 0.5 },
	                { text: 'languageId', dataIndex: 'languageId', flex: 0.5 },
	                { text: 'Director', dataIndex: 'director', flex: 0.5 },
	                { text: 'Rating', dataIndex: 'rating', flex: 0.5 },
	                { text: 'Special Feature', dataIndex: 'specialFeature', flex: 0.5 }
	            ]
	        }]
	    }],
	    renderTo: 'formId'
	});
});