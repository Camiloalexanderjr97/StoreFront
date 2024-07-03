import { Photo } from './../Modelos/Photo';
import { ExportService } from 'app/Services/ConverterExcel/exporter.service';
import { TokenService } from 'app/Services/JWT/token.service';
import { PhotoService } from "app/Services/photo.service";
import { ViewChild } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { CargarScriptsService } from "cargar-scripts.service";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import * as XLSX from 'xlsx';

interface objeto {
  name: any;
  value: any;
}
@Component({
  selector: "producto",
  templateUrl: "./producto.component.html",
  styleUrls: ["./producto.component.css"],
})
export class ProductoComponent implements OnInit {
  photo: Photo;
  photoN = new Photo();
  displayedColumns: string[] = ['name', 'description', 'gender', 'amount', 'price', 'stock', 'actions'];
  listarPhotos: Photo[] = []; 
  dataSource: any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  filtroPhoto: FormGroup;
  multi: any[];
  view: [number, number] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Categoria de Photos';
  showYAxisLabel = true;
  yAxisLabel;
  showDataLabel = true;

  colorScheme = {
    domain: [
      '#FF8A80',
      '#EA80FC',
      '#8C9EFF',
      '#80D8FF',
      '#A7FFEB',
      '#CCFF90',
      '#FFFF8D',
      '#FF9E80'
    ]
  };

  isLogged = false;
  soloAdmin = false;

  mostrarListado: Boolean = true;
  mostrarAgregarIndividual: Boolean = false;
  mostrarAgregarMasivo: Boolean = false;
  mostrarEstadistica: Boolean = false;

  inicio = new FormControl(new Date().toISOString(), Validators.required);
  fin = new FormControl(new Date().toISOString(), Validators.required);
  datos: Photo[] = [];
  pros: objeto[] = [];
  nuevo: objeto[] = [];
  program: String = '';

  constructor(
    private exportService: ExportService,
    private fb: FormBuilder,
    private photoService: PhotoService,
    private _liveAnnouncer: LiveAnnouncer,
    private _CargaScripts: CargarScriptsService,
    private router: Router,
    private tokenService: TokenService
  ) {
    this.filtroPhoto = this.fb.group({
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
    });
  }

  ngOnInit() {
    const rol = sessionStorage.getItem("rol_");
    if (rol === 'ROLE_ADMIN') {
      this.soloAdmin = true;
    } else {
      this.soloAdmin = false;
    }
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.listarPhoto();
    } else {
      this.isLogged = false;
      this.router.navigate(['/login']);
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'No tienes Acceso',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  listarPhoto() {
    this.photoService.getPhotos().subscribe(
      res => {
        this.listarPhotos = [];
        for (let photo of res) {
          photo.stock = photo.stock == "0" ? "Avaliable" : "Unavailable";
          photo.gender = photo.gender == "0" ? "Male" : "Female";
          this.listarPhotos.push(photo);
        }
        this.dataSource = new MatTableDataSource(this.listarPhotos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      err => console.log(err)
    );
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  formatearFecha(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  mostrarList() {
    this.mostrarListado = true;
    this.mostrarEstadistica = false;
    this.listarPhoto();
  }

  estadisticas() {
    this.mostrarEstadistica = true;
    this.mostrarListado = false;
    this.filtrarEstadistica();
  }

  onSelect(event) {
    console.log(event);
  }

  guardarPhoto(dato: any) {
    this.program = dato.target.value;
  }

  filtrarEstadistica() {
    // Implementar lógica de filtrado de estadísticas
  }

  imprSelec() {
    const ficha = document.getElementById("estadistica");
    const ventimp = window.open(' ', 'popimpr');
    ventimp.document.write(ficha.innerHTML);
    ventimp.document.close();
    ventimp.print();
    ventimp.close();
  }

    
  deletePhoto(id: string) {
    console.log("____________"+id)
    this.photoService.deletePhoto(id)
      .subscribe(res => {
        console.log(res)
        window.location.reload();

      })
  }
}
