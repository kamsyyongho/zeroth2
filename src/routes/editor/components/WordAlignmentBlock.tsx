import { withStyles } from '@material-ui/core/styles';
import React from 'reactn';
import { CustomTheme } from '../../../theme/index';
import ContentEditable from "react-contenteditable";

const styles = (theme: CustomTheme) => ({
    root: {
        margin: theme.spacing(1),
    },
    block: {
        marginLeft: theme.spacing(1),
    },
    wordAlignment: {
        minWidth: 0,
        display: 'inline',
        width: 'fit-content',
        margin: 0,
        padding: 0,
        fontSize: '14px',
    }
});

export interface WordAlignmentProp {
    segmentIndex: number,
    wordAlignmentIndex: number,
    wordAlignmentsLength:number,
    findWordAlignmentIndexToPrevSegment: (segmentIndex: number, currenLocation: number) => any;
    getLastAlignmentIndexInSegment: (segmentIndex: number) => any,
    classes: any,
    start: number,
    length: number,
    word: string,
    confidence: number,
    lengthBeforeBlock: number,
}

export interface State {
    text: string,
    wordAlignmentId: string,
    element: any,
}

class WordAlignmentBlock extends React.Component <WordAlignmentProp, State>{
    // node: HTMLElement | null = null;
    constructor(props: any) {
        super();
        this.state = {
            element: React.createRef(),
            text: props.word,
            wordAlignmentId: `word-${props.segmentIndex}-${props.wordAlignmentIndex}`
        };
    }

    handleChange = (event: SyntheticEvent) => {
        const text: string = event?.target?.value;
        const firstWordAlignment = document.getElementById('word-alignment-0-0');
        console.log('element getSelection : ', window.getSelection());
        console.log('first word alignment : ',firstWordAlignment);
        console.log('handle change by ContentEditable : ', event);
        this.setState({ text: text });
        // selected?.setPosition(this.state.node, 0);
    };

    handleArrowUp = () => {
        const selection = window.getSelection();
        const currentLocation = selection?.anchorOffset;
        const wordAlignmentIndex = this.props.findWordAlignmentIndexToPrevSegment
        (this.props.segmentIndex - 1, currentLocation + this.props.lengthBeforeBlock);
        const previousSegmentNode = document.getElementById
        (`word-alignment-${this.props.segmentIndex - 1}-${wordAlignmentIndex}`);
        const currentNode = this.state.element;

        currentNode.current.blur();
        selection?.setPosition(previousSegmentNode, 0)
    };

    handleArrowDown = () => {
        const selection = window.getSelection();
        const currentLocation = selection?.anchorOffset;
        const wordAlignmentIndex = this.props.findWordAlignmentIndexToPrevSegment
        (this.props.segmentIndex + 1, currentLocation + this.props.lengthBeforeBlock);
        const nextSegmentNode = document.getElementById
        (`word-alignment-${this.props.segmentIndex + 1}-${wordAlignmentIndex}`);
        const currentNode = this.state.element;

        currentNode.current.blur();
        selection?.setPosition(nextSegmentNode, 0);
    };


    handleArrowRight = () => {
        const selectCaretLocation = window.getSelection();
        const nextWordAlignmentBlock = document.getElementById
        (`word-alignment-${this.props.segmentIndex}-${this.props.wordAlignmentIndex + 1}`);
        const firstBlockNextSegment = document.getElementById
        (`word-alignment-${this.props.segmentIndex + 1}-0`);

        if(selectCaretLocation?.anchorOffset === selectCaretLocation?.anchorNode?.length) {
            selectCaretLocation?.setPosition(nextWordAlignmentBlock, 0);

            if(this.props.wordAlignmentIndex === this.props.wordAlignmentsLength - 1) {
                selectCaretLocation?.setPosition(firstBlockNextSegment, 0);
            }
        }
        return;
    };

    handleArrowLeft = () => {
        const selectCaretLocation = document.getSelection();
        const lastWordPrevSegment = this.props.getLastAlignmentIndexInSegment(this.props.segmentIndex - 1);
        const prevWordAlignmentBlock = document.getElementById
        (`word-alignment-${this.props.segmentIndex}-${this.props.wordAlignmentIndex - 1}`);
        const lastBlockPreviousSegment = document.getElementById
        (`word-alignment-${this.props.segmentIndex - 1}-${lastWordPrevSegment.index}`);

        console.log('lastWordPrevSegment : ', lastWordPrevSegment);
        console.log('selectCaretLocation : ', selectCaretLocation);

        if(selectCaretLocation?.anchorOffset === 0) {
            const range = document.createRange();
            this.state.element.current.blur();
            if(this.props.wordAlignmentIndex === 0) {
                console.log('lastBlockPreviousSegment : ', lastBlockPreviousSegment);
                // range.setEnd(lastBlockPreviousSegment, lastWordPrevSegment.word.length - 1);
                // range.setStart(lastBlockPreviousSegment, 0);
                // selectCaretLocation?.setPosition(lastBlockPreviousSegment, lastWordPrevSegment.word.length - 1);
                selectCaretLocation?.collapse(lastBlockPreviousSegment, 0);
                console.log('selectCaretLocation after collapse : ', selectCaretLocation);
                // selectCaretLocation?.collapseToEnd();
                return;
            }
            selectCaretLocation?.setPosition(prevWordAlignmentBlock, 0);
            selectCaretLocation?.collapseToEnd();
        }
        return;
    };

    handleKeyDown = (event: KeyboardEvent) => {
        console.log('event in keydown event :', event);
        switch(event.code) {
            case "ArrowUp":
                this.handleArrowUp();
                break;
            case "ArrowDown":
                this.handleArrowDown();
                break;
            case "ArrowLeft":
                this.handleArrowLeft();
                break;
            case "ArrowRight":
                this.handleArrowRight();
                break;
            default:
                return;
        }
    };

    handleOnFocus = () => {
        console.log('what');
    };

    handleOnBlur = () => {
        console.log('does it get called?');
        document.removeEventListener('keydown', this.handleKeyDown);
    };

    componentDidMount = () => {
        console.log('node, inside componenDidMount : ', this.state.element);
        this.state.element.current.addEventListener('keydown', this.handleKeyDown);
    };

    render() {
        const { classes } = this.props;
        const { element, text, wordAlignmentId } = this.state;
        return (
            <ContentEditable id={wordAlignmentId}
                             innerRef={element}
                             className={classes.wordAlignment}
                             onChange={this.handleChange}
                             onBlur={this.handleOnBlur}
                             html={text}
                             disabled={false} />
        )
    }
}

export default withStyles(styles)(WordAlignmentBlock);