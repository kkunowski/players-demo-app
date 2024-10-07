import SwiftUI

struct PositionPicker: View {
    @Binding var selectedPosition: String
    let positions: [String]
    var body: some View {
        Picker("Position", selection: $selectedPosition) {
            ForEach(positions, id: \.self) { position in
                Text(position).tag(position)
            }
        }
        .pickerStyle(SegmentedPickerStyle())
        .padding(.horizontal)
    }
}
