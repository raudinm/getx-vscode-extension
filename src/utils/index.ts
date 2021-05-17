import * as changeCase from "change-case";


export const generateControllerTemplate = (resourceName: string): string => {
  const controllerTemplate: string = `
  import 'package:get/get.dart';

  class ${resourceName}Controller extends GetxController {

  }
  `;

  return controllerTemplate;
};

export const generatePageTemplate = (resourceName: string): string => {
  const snakeCaseName = changeCase.snakeCase(resourceName.toLowerCase());
  const pageTemplate: string = `
  import 'package:flutter/material.dart';
  import 'package:get/get.dart';
  import '../../../controllers/${snakeCaseName}_controller.dart';


  class ${resourceName}Page extends GetView<${resourceName}Controller> {
    @override
    Widget build(BuildContext context) {
      return Scaffold(
        appBar: AppBar(
          title: Text('${resourceName}Page'),
        ),
        body: SafeArea(
          child: Text('${resourceName}Controller'),
        ),
      );
    }
  }
  `;

  return pageTemplate;
};

export const generateBindingTemplate = (resourceName: string): string => {
  const snakeCaseName = changeCase.snakeCase(resourceName.toLowerCase());
  const bindingTemplate: string = `
  import 'package:get/get.dart';
  import '../controllers/${snakeCaseName}_controller.dart';


  class ${resourceName}Binding implements Bindings {
    @override
    void dependencies() {
      Get.lazyPut<${resourceName}Controller>(() => ${resourceName}Controller());
    }
  }`;


  return bindingTemplate;
};
