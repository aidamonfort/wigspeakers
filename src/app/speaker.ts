import { ɵBlockUntilFirstOperator } from '@angular/fire';

export class Speaker {

    constructor(
        public id: string = '',
        public name: string = '',
        public position: string = '',
        public qualifications: string[] = [],
        public sector: {
            private: boolean,
            public: boolean,
            ngo: boolean,
            self: boolean,
            university: boolean,
            international: boolean,
            other: boolean,
        } = {
                private: false,
                public: false,
                ngo: false,
                self: false,
                university: false,
                international: false,
                other: false,
            },
        public otherSector: string = '',
        public bio: string = '',
        public region: string = '',
        public country: string = '',
        public city: string = '',
        public years: string = '',
        public level: string = '',
        public newareas: {
            research: boolean,
            geosoft: boolean,
            geosoftsub: {
                foss4g: boolean,
                arcgis: boolean,
                mapinfo: boolean,
                cadcorp: boolean,
                fme: boolean,
                other: boolean,
            },
            webmapping: boolean,
            webmappingsub: {
                openlayers: boolean,
                leaflet: boolean,
                arcgis: boolean,
                d3: boolean,
                mapbox: boolean,
                other: boolean,
            },
            geoopendata: boolean,
            geoopendatasub: {
                geonode: boolean,
                arcgis: boolean,
                copernicus: boolean,
                earth: boolean,
                google: boolean,
            },
            remote: boolean,
            gis: boolean,
            ethical: boolean,
            geocloud: boolean,
            geocloudsub: {
                google: boolean,
                amazon: boolean,
                other: boolean,
            },
            geoprogramming: boolean,
            geoprogrammingsub: {
                python: boolean,
                r: boolean,
                jupyter: boolean,
                javascript: boolean,
                other: boolean,
            },
            datavis: boolean,
            datavissub: {
                cartography: boolean,
                dashboards: boolean,
                graphic: boolean,
            },
            dataJournalism: boolean,
            strategic: boolean,
            strategicsub: {
                geospatial: boolean,
                policy: boolean,
                gi: boolean,
                growth: boolean,
            },
            geodata: boolean,
            geodatasub: {
                spatial: boolean,
                location: boolean,
                bigdata: boolean,
                opendata: boolean,
            },
            entrepreneurship: boolean,
            innovation: boolean,
            innovationsub: {
                ar: boolean,
                vr: boolean,
                ml: boolean,
                blockchain: boolean,
                fiveg: boolean,
                iot: boolean,
                geotrans: boolean,
            },
            other: boolean
        } = {
                research: false,
                geosoft: false,
                geosoftsub: {
                    foss4g: false,
                    arcgis: false,
                    mapinfo: false,
                    cadcorp: false,
                    fme: false,
                    other: false,
                },
                webmapping: false,
                webmappingsub: {
                    openlayers: false,
                    leaflet: false,
                    arcgis: false,
                    d3: false,
                    mapbox: false,
                    other: false,
                },
                geoopendata: false,
                geoopendatasub: {
                    geonode: false,
                    arcgis: false,
                    copernicus: false,
                    earth: false,
                    google: false,
                },
                remote: false,
                gis: false,
                ethical: false,
                geocloud: false,
                geocloudsub: {
                    google: false,
                    amazon: false,
                    other: false,
                },
                geoprogramming: false,
                geoprogrammingsub: {
                    python: false,
                    r: false,
                    jupyter: false,
                    javascript: false,
                    other: false,
                },
                datavis: false,
                datavissub: {
                    cartography: false,
                    dashboards: false,
                    graphic: false,
                },
                dataJournalism: false,
                strategic: false,
                strategicsub: {
                    geospatial: false,
                    policy: false,
                    gi: false,
                    growth: false,
                },
                geodata: false,
                geodatasub: {
                    spatial: false,
                    location: false,
                    bigdata: false,
                    opendata: false,
                },
                entrepreneurship: false,
                innovation: false,
                innovationsub: {
                    ar: false,
                    vr: false,
                    ml: false,
                    blockchain: false,
                    fiveg: false,
                    iot: false,
                    geotrans: false,
                },
                other: false,
            },
        public newAreasOther: {
            researchText: string,
            geoprogrammingsubText: string,
            geosoftsubText: string,
            otherText: string,
            geocloudsubText: string,
            webmappingsubText: string
        } = {
                researchText: '',
                geoprogrammingsubText: '',
                geosoftsubText: '',
                otherText: '',
                geocloudsubText: '',
                webmappingsubText: ''
            },
        public domain: {
            public: boolean,
            defence: boolean,
            emergency: boolean,
            climate: boolean,
            smart: boolean,
            citizen: boolean,
            transportation: boolean,
            energy: boolean,
            manufacturing: boolean,
            environment: boolean,
            food: boolean,
            sustainable: boolean,
            policy: boolean,
            other: boolean,
        } = {
                public: false,
                defence: false,
                emergency: false,
                climate: false,
                smart: false,
                citizen: false,
                transportation: false,
                energy: false,
                manufacturing: false,
                environment: false,
                food: false,
                sustainable: false,
                policy: false,
                other: false,
            },
        public otherAreas: string[] = [],
        public otherApplications: string = '',
        public otherDomains: string[] = [],
        public languages: string[] = [],
        public speakingExperience: string = '',
        public contactEmail: boolean = false,
        public email: string = '',
        public contactLinkedIn: boolean = false,
        public linkedIn: string = '',
        public contactTwitter: boolean = false,
        public twitter: string = '',
        public picture: string = '',
        public webpage: string = '',
        public signin: {
            option: string,
            slack: boolean,
            mailing: boolean
        } = {
                option: '',
                slack: false,
                mailing: false
            },
    ) { }

}


