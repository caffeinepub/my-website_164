import List "mo:core/List";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";

actor {
  public type Submission = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Int;
  };

  module Submission {
    public func compare(s1 : Submission, s2 : Submission) : Order.Order {
      Int.compare(s2.timestamp, s1.timestamp);
    };
  };

  let submissions = List.empty<Submission>();

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, message : Text) : async () {
    if (message.size() <= 1) { Runtime.trap("Message can't be empty") };
    let newSubmission : Submission = {
      name;
      email;
      message;
      timestamp = Time.now();
    };
    submissions.add(newSubmission);
  };

  public query ({ caller }) func getSubmissions() : async [Submission] {
    submissions.toArray().sort();
  };
};
