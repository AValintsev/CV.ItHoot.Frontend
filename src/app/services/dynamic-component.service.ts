import {
  Compiler,
  Component,
  ComponentFactory,
  Injectable,
  NgModule, Type,
  ViewContainerRef,
  ViewEncapsulation
} from "@angular/core";
import {CommonModule} from "@angular/common";

@Injectable({
  providedIn: "root"
})
export class DynamicComponentService {

  protected cacheOfFactories: {[key: string]: ComponentFactory<any>};
  protected componentCache: {[key: string]: Type<any>};
  protected moduleCache: {[key: string]: Type<any>};

  constructor(protected compiler: Compiler) {
    this.cacheOfFactories = {};
    this.componentCache = {};
    this.moduleCache = {};
  }

  /**
   *
   * @param viewContainerRef
   * @param selector
   * @param template
   */
  createComponentFactory(viewContainerRef: ViewContainerRef, selector: string, template: string) {
    const componentFound = this.componentCache[selector];
    if(componentFound) {
      this.compiler.clearCacheFor(componentFound);
      delete this.componentCache[selector];
    }
    const moduleFound = this.moduleCache[selector];
    if(moduleFound) {
      this.compiler.clearCacheFor(moduleFound);
      delete this.moduleCache[selector];
    }

    viewContainerRef.clear();

    this.componentCache[selector] = Component({
      selector,
      template,
      encapsulation: ViewEncapsulation.None
    })(class {
    });

    this.moduleCache[selector] = NgModule({
      imports: [CommonModule,],
      declarations: [this.componentCache[selector]]
    })(class {
    });

    return this.compiler.compileModuleAndAllComponentsAsync(this.moduleCache[selector])
      .then((factories) => {
        const foundFactory = factories.componentFactories.find((factory) => {
          return factory.selector === selector;
        });

        if(foundFactory) {
          return viewContainerRef.createComponent(foundFactory);
        }

        throw new Error("component not found");
      })
      .catch((error) => {
        console.log("error", error);

        this.compiler.clearCacheFor(componentFound);
        delete this.componentCache[selector];
        this.compiler.clearCacheFor(moduleFound);
        delete this.moduleCache[selector];

        return Promise.reject(error);
      });
  }

}
