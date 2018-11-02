import React, { PureComponent } from 'react'
// TODO: This is wonky... find a better solution
import AlignmentTool from 'common/components/AlignmentTool'
import XYController from 'common/components/XYController'

import log from 'common/dev/Logger'

// TODO: Figure out better way of dealing with dimensions, styling, layout, etc.

class JDotterPanel extends PureComponent {
	constructor(props) {
		super(props)

		this.horizSeq =
			'ATGCTTTGTGGTTGTAGACAACATTGCAGGTGTGACACAGCGCTTAGCCGTCCGCTGTGGCTGACCATCGTCGCGAGTACGAGGTCAGCATCGAGTCACCTGCTGATGCCGGTACCACATTCGGTAAGCGGATTTCACTTGACAGCTGGTAATTATTCTACCCGACCCCTGGTTTCCCATAATGGGGTAGTCGGGCTGAACGCGCGTAGAGACAGCGGGATCTGTTTACAGCGCCAACTCGATAGTGCCGTATATTTGACACGCTTACCCATATATCAAGCGCGTCCGGTGGGAAGATAA'
		this.horizRevComp = this.getRevComp(this.horizSeq)
		this.verticalSeq =
			'ATGCCTTATGGCGTGTTATCAGAGTTATCTGTGAAACAGACCCCGCCTACAGGTGTCTTAATTCGAATATCCCGCTGTAGCAAAGTCACTTCGCTTGAGAATCCTAAGTTAAATGTCTTGTGTAGGGATGGGCCGATAGATGAACCTTTTTTAAAGTGCAGCGCGTTGCTAGATGGAGCGATGAGAGAATTTCCCTCCACGAGATTTTGCCTTAAGGTCGACTCAGTTGTCTTGACCCTACGACTCGAGGGTGCGCAGGGACAGTCTCGGGCAAACTCTGATCTACCCCCTTTCGCTTAA'
		this.verticalRevComp = this.getRevComp(this.verticalSeq)
		this.numVisible = 37
		this.baseSize = 22

		this.state = { x: 0, y: 0 }
	}

	updateX(x) {
		this.setState({ ...this.state, x })
	}

	updateY(y) {
		this.setState({ ...this.state, y })
	}

	handleScrubA(percent) {
		this.updateX(Math.floor(this.horizSeq.length * percent))
	}

	handleScrubB(percent) {
		this.updateY(Math.floor(this.verticalSeq.length * percent))
	}

	handleXhairsMove(e, { x, y }) {
		this.setState({ ...this.state, x, y })
		}

	render() {
		return (
			<div>
				<div>
					<XYController
						width={this.horizSeq.length}
						height={this.verticalSeq.length}
						x={0}
						y={0}
						xhairsSize={20}
						onXhairsMove={this.handleXhairsMove.bind(this)}
					>
						Results go here
					</XYController>
				</div>

				<div>
					<h2>Sequence</h2>
					<AlignmentTool
						seqA={this.horizSeq}
						seqAStart={this.state.x}
						onScrubA={this.handleScrubA.bind(this)}
						seqB={this.verticalSeq}
						seqBStart={this.state.y}
						onScrubB={this.handleScrubB.bind(this)}
						numVisible={this.numVisible}
						baseSize={this.baseSize}
					/>
				</div>

				<div>
					<h2>Reverse Complement Sequence</h2>
					<AlignmentTool
						seqA={this.horizRevComp}
						seqAStart={this.state.x}
						onScrubA={this.handleScrubA.bind(this)}
						seqB={this.verticalRevComp}
						seqBStart={this.state.y}
						onScrubB={this.handleScrubB.bind(this)}
						numVisible={this.numVisible}
						baseSize={this.baseSize}
					/>
				</div>
			</div>
		)
	}

	// TODO: Move to external tool
	getRevComp(seq) {
		let revComp = ''

		const tt = {
			C: 'G',
			G: 'C',
			T: 'A',
			A: 'T',
		}

		for (let base of seq) {
			revComp = tt[base] + revComp
		}

		return revComp
	}
}

export default JDotterPanel