import { Component, OnInit, Injectable, ViewChild } from '@angular/core';
import { RolService } from 'src/app/_services/rol.service';
import { TreeviewItem, TreeviewConfig, TreeviewHelper, TreeviewComponent ,
  TreeviewEventParser, OrderDownlineTreeviewEventParser, DownlineTreeviewItem } from 'ngx-treeview';
import { isNil, remove, reverse } from 'lodash';

import { Router, ActivatedRoute } from '@angular/router';
import { PaginarolMod } from 'src/app/_models/paginarol';
import { ToastrService } from 'ngx-toastr';



@Injectable()
  export class ProductTreeviewConfig extends TreeviewConfig {
      hasAllCheckBox = true;
      hasFilter = true;
      hasCollapseExpand = false;
      maxHeight = 400;
  }

@Component({
  selector: 'app-asignaropciones',
  templateUrl: './asignaropciones.component.html',
  styleUrls: ['./asignaropciones.component.css'],
  providers: [
    RolService,
      { provide: TreeviewEventParser, useClass: OrderDownlineTreeviewEventParser },
      { provide: TreeviewConfig, useClass: ProductTreeviewConfig }
  ]
})
export class AsignaropcionesComponent implements OnInit  {
  constructor(private _rolService: RolService,
              private activatedRoute: ActivatedRoute, private router: Router, private alertify: ToastrService) {
  }

  @ViewChild(TreeviewComponent) treeviewComponent: TreeviewComponent;
  dropdownEnabled = true;
  items: TreeviewItem[];
  siblings: TreeviewItem[];
  menu: TreeviewItem;
  values: number[];
  rows: string[];
  model: PaginarolMod[] = [];
  paginarol: PaginarolMod;
  id: number;
  config = TreeviewConfig.create({
      hasAllCheckBox: true,
      hasFilter: true,
      hasCollapseExpand: true,
      decoupleChildFromParent: false,
      maxHeight: 400
  });
  buttonClasses = [
    'btn-outline-primary',
    'btn-outline-secondary',
    'btn-outline-success',
    'btn-outline-danger',
    'btn-outline-warning',
    'btn-outline-info',
    'btn-outline-light',
    'btn-outline-dark'
];
  buttonClass = this.buttonClasses[0];
 onSelectedChange(downlineItems: DownlineTreeviewItem[]) {
        this.rows = [];
        downlineItems.forEach(downlineItem => {
            const item = downlineItem.item;
            const value = item.value;
            const texts = [item.text];
            let parent = downlineItem.parent;
            while (!isNil(parent)) {
                texts.push(parent.item.text);
                parent = parent.parent;
            }
            const reverseTexts = reverse(texts);

            const row = `${reverseTexts.join(' -> ')} : ${value}`;
            this.rows.push(item.value);

        });
    }
    removeItem(item: TreeviewItem) {
      let isRemoved = false;
      for (const tmpItem of this.items) {
          if (tmpItem === item) {
              remove(this.items, item);
          } else {
              isRemoved = TreeviewHelper.removeItem(tmpItem, item);
              if (isRemoved) {
                  break;
              }
          }
      }

      if (isRemoved) {
          this.treeviewComponent.raiseSelectedChange();
      }
  }

  ngOnInit() {
    this.id  = this.activatedRoute.snapshot.params.uid;

    this._rolService.getPaginas(this.id).subscribe(list => {

      console.log(list);

      const primary = list;
      this.items = [] ;
      primary.forEach(element => {
          element.children.forEach( x => {
             x.checked =  (x.checked === true ? true : false);
          });
      });

      primary.forEach(element => {
          if (element.children.length !== 0) {
            this.menu =  new TreeviewItem({
                text: element.text
              , value: element.value
              , checked:  false
              , children: []  = element.children
            });
            this.items.push(this.menu);
          }
      });
    });


}
cancel(){
  this.router.navigate(['/seguridad/listaroles']);
}
save(row) {
  this.model = [];
  row.forEach(element => {
     this.model.push({ idPagina: element,
      idRol: this.id,
      permisos: 'AME' } );
 });

  this._rolService.savePaginas(this.model).subscribe(resp => {
  }, error => {
     this.alertify.error(error);
  }, () => {
    this.alertify.success('Se registró correctamente.');
    this.router.navigate(['/seguridad/listaroles']);
  });
}
}
