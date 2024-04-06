'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">assignment-angular-part documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-29003417493cdae4dc3a0e7041aa17c0e4f2210f62b190a1ec38f1e31bc8319fd8da28f52f5eafb3da1a78994935a3a6003b4646835d89d5c8e90ce215721a7d"' : 'data-bs-target="#xs-components-links-module-AppModule-29003417493cdae4dc3a0e7041aa17c0e4f2210f62b190a1ec38f1e31bc8319fd8da28f52f5eafb3da1a78994935a3a6003b4646835d89d5c8e90ce215721a7d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-29003417493cdae4dc3a0e7041aa17c0e4f2210f62b190a1ec38f1e31bc8319fd8da28f52f5eafb3da1a78994935a3a6003b4646835d89d5c8e90ce215721a7d"' :
                                            'id="xs-components-links-module-AppModule-29003417493cdae4dc3a0e7041aa17c0e4f2210f62b190a1ec38f1e31bc8319fd8da28f52f5eafb3da1a78994935a3a6003b4646835d89d5c8e90ce215721a7d"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link" >MaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ProjectsModule.html" data-type="entity-link" >ProjectsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ProjectsModule-9a0d650b8fbcdc9d022ab56352b8df5765d24d1e4d93cc2aeaa63dfe3df91e38eebeca55ccf129379cc63edc6f78841f03d432b7a9ef3469108c854f2d8601fc"' : 'data-bs-target="#xs-components-links-module-ProjectsModule-9a0d650b8fbcdc9d022ab56352b8df5765d24d1e4d93cc2aeaa63dfe3df91e38eebeca55ccf129379cc63edc6f78841f03d432b7a9ef3469108c854f2d8601fc"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProjectsModule-9a0d650b8fbcdc9d022ab56352b8df5765d24d1e4d93cc2aeaa63dfe3df91e38eebeca55ccf129379cc63edc6f78841f03d432b7a9ef3469108c854f2d8601fc"' :
                                            'id="xs-components-links-module-ProjectsModule-9a0d650b8fbcdc9d022ab56352b8df5765d24d1e4d93cc2aeaa63dfe3df91e38eebeca55ccf129379cc63edc6f78841f03d432b7a9ef3469108c854f2d8601fc"' }>
                                            <li class="link">
                                                <a href="components/AdminDashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminDashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProjectsDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProjectsDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProjectsFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProjectsFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProjectsListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProjectsListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProjectsRoutingModule.html" data-type="entity-link" >ProjectsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SharedModule-441a1280c0a0189446e4920ab5b67b894beb964ce623438c74fa76b8363e91a8b1442df787cffe6377465a2424ce7e08cb318ec707c15b63d4e113352c980835"' : 'data-bs-target="#xs-components-links-module-SharedModule-441a1280c0a0189446e4920ab5b67b894beb964ce623438c74fa76b8363e91a8b1442df787cffe6377465a2424ce7e08cb318ec707c15b63d4e113352c980835"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-441a1280c0a0189446e4920ab5b67b894beb964ce623438c74fa76b8363e91a8b1442df787cffe6377465a2424ce7e08cb318ec707c15b63d4e113352c980835"' :
                                            'id="xs-components-links-module-SharedModule-441a1280c0a0189446e4920ab5b67b894beb964ce623438c74fa76b8363e91a8b1442df787cffe6377465a2424ce7e08cb318ec707c15b63d4e113352c980835"' }>
                                            <li class="link">
                                                <a href="components/ConfirmDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConfirmDialogComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TasksModule.html" data-type="entity-link" >TasksModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TasksModule-70319f35b8faa2538ed8a549c946236e655e508c154cb4c7b86d2c212ba67761a27a70d96a1d9ed4dc550e88b63fdaa5bd81f63573b8ad7b09e4b9ed564e4fd4"' : 'data-bs-target="#xs-components-links-module-TasksModule-70319f35b8faa2538ed8a549c946236e655e508c154cb4c7b86d2c212ba67761a27a70d96a1d9ed4dc550e88b63fdaa5bd81f63573b8ad7b09e4b9ed564e4fd4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TasksModule-70319f35b8faa2538ed8a549c946236e655e508c154cb4c7b86d2c212ba67761a27a70d96a1d9ed4dc550e88b63fdaa5bd81f63573b8ad7b09e4b9ed564e4fd4"' :
                                            'id="xs-components-links-module-TasksModule-70319f35b8faa2538ed8a549c946236e655e508c154cb4c7b86d2c212ba67761a27a70d96a1d9ed4dc550e88b63fdaa5bd81f63573b8ad7b09e4b9ed564e4fd4"' }>
                                            <li class="link">
                                                <a href="components/TasksFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TasksFormComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ProjectService.html" data-type="entity-link" >ProjectService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TasksService.html" data-type="entity-link" >TasksService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserstateService.html" data-type="entity-link" >UserstateService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Project.html" data-type="entity-link" >Project</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Quote.html" data-type="entity-link" >Quote</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Task.html" data-type="entity-link" >Task</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Task-1.html" data-type="entity-link" >Task</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});