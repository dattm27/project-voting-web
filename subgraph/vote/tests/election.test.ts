import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { NewCandidate } from "../generated/schema"
import { NewCandidate as NewCandidateEvent } from "../generated/Election/Election"
import { handleNewCandidate } from "../src/election"
import { createNewCandidateEvent } from "./election-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let electionId = BigInt.fromI32(234)
    let candidateId = BigInt.fromI32(234)
    let name = "Example string value"
    let patry = "Example string value"
    let newNewCandidateEvent = createNewCandidateEvent(
      electionId,
      candidateId,
      name,
      patry
    )
    handleNewCandidate(newNewCandidateEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("NewCandidate created and stored", () => {
    assert.entityCount("NewCandidate", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "NewCandidate",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "electionId",
      "234"
    )
    assert.fieldEquals(
      "NewCandidate",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "candidateId",
      "234"
    )
    assert.fieldEquals(
      "NewCandidate",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "name",
      "Example string value"
    )
    assert.fieldEquals(
      "NewCandidate",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "patry",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
