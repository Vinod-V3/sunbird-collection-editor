import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EditorService } from '../../services/editor/editor.service';
import { QuestionService } from "../../services/question/question.service";
import { TreeService } from "../../services/tree/tree.service";
import * as _ from "lodash-es";

@Component({
  selector: 'lib-assign-page-number',
  templateUrl: './assign-page-number.component.html',
  styleUrls: ['./assign-page-number.component.scss']
})
export class AssignPageNumberComponent implements OnInit {

  toolbarConfig: any = {};
  pageId = 'pagination';
  treeData:any
  questions:any;
  @Output() assignPageEmitter = new EventEmitter<any>();

  constructor(private editorService: EditorService,private treeService: TreeService,
    private questionService: QuestionService) { }

  ngOnInit(): void {
    this.toolbarConfig = this.editorService.getToolbarConfig();
    this.toolbarConfig.title = 'Observation Form';
    this.treeData=this.editorService.treeData;
  }

  toolbarEventListener(event) {
    switch (event.button) {
      case 'backContent':
        this.handleRedirectToQuestionSet();
        break;
    }
  }

  handleRedirectToQuestionSet() {
    this.redirectToQuestionSet();
  }

  treeEventListener(event){
    console.log(event);
     const data = this.treeService.getFirstChild();
    let hierarchy = this.editorService.getHierarchyObj(data,'',event?.identifier);
    this.questionService.getQuestionList(_.get(hierarchy[event?.identifier],'children'))
    .subscribe((response:any)=>{
      this.questions=_.get(response,'result.questions');
      console.log(this.questions);
    },(error:any)=>{
      console.log(error);
    })
  }

  redirectToQuestionSet() {
    setTimeout(() => {
      this.assignPageEmitter.emit({ status: false });
    }, 100);
  }

}
