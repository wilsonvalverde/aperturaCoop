

<script>
import VGrid from "@revolist/vue-datagrid";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import Cam from './Cam';
import $ from 'jquery'
am4core.useTheme(am4themes_animated);


export default {
  components: {
    Cam,
    VGrid,
  },
  name: 'HelloWorld',
  
  data: function(){
    return{
      columns: [{
          prop: "name",
          name: "First",
        },
        {
          prop: "details",
          name: "Second",
      }],
      rows: [{
        name: "1",
        details: "Item 1",
      }],
      person: [],
      firts:'',
      second:'',
      third:'',
      fourth:'',
      fifth:'',
    hi:false
    }
  },

  props:['APIS','header'],
  methods:{
    imprimir(){
   
    let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);

    chart.paddingRight = 20;

    let data = [];
    let visits = 10;
    for (let i = 1; i < 90; i++) {
      visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random());
      data.push({ date: new Date(2021, 0, i), name: "name" + i, value: visits });
    }

    chart.data = data;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";

    series.tooltipText = "{valueY.value}";
    chart.cursor = new am4charts.XYCursor();

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    chart.scrollbarX = scrollbarX;

    this.chart = chart;
    //nuevo diagrama

    let chart2 = am4core.create(this.$refs.chartdiv2, am4charts.XYChart);


    // Add data
    chart2.data = [{
      "year": "Mayo",
      "europe": this.firts,
      "namerica": this.second,
      "asia": this.third,
      "lamerica": this.fourth,
      "meast": this.fifth
    }]
    console.log(chart2.data)
    // Create axes
    let categoryAxis = chart2.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "year";
    categoryAxis.renderer.grid.template.location = 0;


    let valueAxis2 = chart2.yAxes.push(new am4charts.ValueAxis());
    valueAxis2.renderer.inside = true;
    valueAxis2.renderer.labels.template.disabled = true;
    valueAxis2.min = 0;

    // Create series
    function createSeries(field, name) {
      
      // Set up series
      let series = chart2.series.push(new am4charts.ColumnSeries());
      series.name = name;
      series.dataFields.valueY = field;
      series.dataFields.categoryX = "year";
      series.sequencedInterpolation = true;
      
      // Make it stacked
      series.stacked = true;
      
      // Configure columns
      series.columns.template.width = am4core.percent(60);
      series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}";
      
      // Add label
      let labelBullet = series.bullets.push(new am4charts.LabelBullet());
      labelBullet.label.text = "{valueY}";
      labelBullet.locationY = 0.5;
      labelBullet.label.hideOversized = true;
      
      return series;
    }

    createSeries("europe", "Identificación");
    createSeries("namerica", "Datos persosales");
    createSeries("asia", "Profesion");
    createSeries("lamerica", "Términos y Condiciones");
    createSeries("meast", "Confirmación");

    // Legend     
    chart2.legend = new am4charts.Legend();


    }
  },
  created(){
    
  },
  beforeCreate(){
    

  },
  mounted() {
    let variables = this;
    const body =  { "id_entity": this.header.idEntity}
    const headers = { "lat": this.header.latitud, "long": this.header.longitud, "dni": this.dni}
    this.$http.post(this.APIS[8].name,body,{headers}).then((response) => {
      response.data.data.forEach(element => {
        if( element.ruta == '/civil_registry/validate'){variables.firts = element.total}
        if( element.ruta == '/recognition/comparate'){variables.second = element.total}
        if( element.ruta == '/dynamicform'){variables.third = element.total}
        if( element.ruta == '/terms/only_entity'){variables.fourth = element.total}
        if( element.ruta == '/sendregister'){variables.fifth = element.total}
      });
      $("#graphics").click();
    }).catch (error=>{
      console.error(error);
    });
    console.log('entramos a post')
    this.$http.post(this.APIS[9].name,body,{headers}).then((response) => {
      console.log(response)
       response.data.data.forEach(element => {
         this.person.push(element)
      });
      console.log('ejejejjeje')
      console.log(this.person)
      $("#graphics").click();
    }).catch (error=>{
      console.error(error);
    });

    
    
  },
}
</script>
<template>
<div>
    
  <center><h1>Cuentas aperturadas</h1></center>
  <div class="hello" ref="chartdiv">
  </div>
<input style="display:none" id="graphics" type="button"  @click="imprimir"  class="form-submit create" value="Ir a la Pagina Principal">
<br>
  <center><h1>En que pasos se quedaron los usuarios?</h1></center>
  <div class="hello2" style="height:46vw" ref="chartdiv2">
  </div>

  <cam v-if="hi" />
<br>
<center><h1>Listado de usuarios y correos que no terminaron el proceso y el paso en el que se quedaron </h1></center>
<br>
<table>
  <tr>
    <th>Usuario</th>
    <th>Correo</th>
    <th>Paso  Final</th>
  </tr>
  <tr v-for="(item) in person" v-bind:key="item.id">
    <td>{{item.dni}}</td>
    <td>{{item.full_name}}</td>
    <td>{{item.ruta}}</td>
  </tr>
</table>
<v-grid
      key="1"
      theme="compact"
      :source="rows"
      :columns="columns"
    >
    </v-grid>  
  
</div>
  
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  width: 100%;
  height: 500px;
}
#hello2 {
  width: 100%;
  height: 15vw;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 80%;
  margin: auto;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>