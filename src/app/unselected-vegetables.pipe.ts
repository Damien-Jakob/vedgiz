import {Pipe, PipeTransform} from '@angular/core';
import {Vegetable} from "./models/vegetable";

@Pipe({
    name: 'unselectedVegetables'
})
export class UnselectedVegetablesPipe implements PipeTransform {

    transform(vegetables: Vegetable[], selectedVegetables: any[]): Vegetable[] {
        return vegetables.filter(vegetable =>
            !selectedVegetables.find(selectedVegetable =>
                selectedVegetable.id == vegetable.id
            )
        );
    }

}
